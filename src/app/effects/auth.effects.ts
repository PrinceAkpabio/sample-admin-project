import { Injectable } from '@angular/core';
import { AuthResponse, LoginCredentials } from 'src/app/models/auth-models';
import { AuthService } from '../services/auth/auth.service';
import { AdminEffects } from './admin.effects';
import { map } from 'rxjs';
import { UserProfile } from '../models/user-models';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private adminEffects: AdminEffects
  ) {}

  handleRegisterUser(credentials: LoginCredentials) {
    return this.authService.register(credentials).pipe(
      map((value: AuthResponse) => {
        // Fetch users in storage
        const users: UserProfile[] = JSON.parse(
          localStorage.getItem('Users') as string
        );

        const splitCredentials = credentials.email.split('@');
        const credentialsNameList = splitCredentials[0].split('.');

        const isUserRegistered = users?.filter(
          (user) => user.email === credentials.email
        );

        // Check if user is registered
        if (isUserRegistered?.length !== 0) {
          alert('User already registered');
          throw 'User already registered';
        }

        // Instantiate the new user
        const user = {
          id: value.id as number,
          index:
            this.adminEffects.users.length === 0
              ? 0
              : Number(this.adminEffects.users.length),
          email: credentials.email,
          first_name: credentialsNameList[0],
          last_name: credentialsNameList[1],
          avatar: `https://reqres.in/img/faces/${value.id}-image.jpg`,
          approved: this.adminEffects.users.length === 0 ? true : false,
          admin: this.adminEffects.users.length === 0 ? true : false,
          token: value.token,
          defaultAdmin: this.adminEffects.users.length === 0 ? true : false,
          adminId: 0,
        };

        // Add user to user list
        this.adminEffects.signUp(user);

        return value;
      })
    );
  }

  handleUserLogin(credentials: LoginCredentials) {
    return this.authService.login(credentials).pipe(
      map((value) => {
        // Fetch users in storage
        const users: UserProfile[] = JSON.parse(
          localStorage.getItem('Users') as string
        );

        const isUserRegistered = users?.filter(
          (user) => user.email === credentials.email
        );

        // Check if user is registered
        if (isUserRegistered?.length === 0) {
          alert('User not registered');
          throw 'User not registered';
        }

        users?.forEach((user) => {
          //  Ensure that users can only login when they have been approved
          if (credentials.email === user.email && user.approved) {
            user.token = value.token;
            localStorage.setItem('activeUser', JSON.stringify(user));
          } else if (credentials.email === user.email && !user.approved) {
            alert('User is not approved to login');
            throw 'User is not approved to login';
          }
        });
        // Save updated users list and loggedIn status
        localStorage.setItem('Users', JSON.stringify(users));
        localStorage.setItem('loggedIn', JSON.stringify(true));

        return value;
      })
    );
  }
}
