import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { UpdateUserProfile } from 'src/app/models/user-models';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminEffects } from './admin.effects';

@Injectable()
export class UserEffects {
  constructor(
    private userService: UserService,
    private router: Router,
    private adminEffects: AdminEffects
  ) {}

  handleGetUsersList(pageNumber: number) {
    return this.userService.getUserList(pageNumber);
  }
  handleGetUser(userId: number) {
    return this.userService.getUser(userId);
  }
  handleUpdateUserProfile(
    userId: number,
    record: UpdateUserProfile
  ): Observable<string> {
    // Update the users list with the new records if user exists
    const updatedUserList = this.adminEffects.users.map((user) => {
      if (userId === user.id) {
        const updatedUser = {
          ...user,
          ...record,
        };
        return updatedUser;
      }
      return user;
    });
    this.adminEffects.users = updatedUserList;

    // Save updated list
    localStorage.setItem('Users', JSON.stringify(updatedUserList));

    return of('Updated');
  }

  handleDeleteUserProfile(userId: number) {
    // Fetch user to be deleted
    const userToDelete = this.adminEffects.users.filter(
      (user) => user.id === userId
    );
    // Delete the user from the users list
    this.adminEffects.users.splice(userToDelete[0].index, 1);
    // Save the updated users list
    localStorage.setItem('Users', JSON.stringify(this.adminEffects.users));

    return of('Deleted');
  }

  logOutUser() {
    localStorage.setItem('activeUser', JSON.stringify(null));
    localStorage.setItem('loggedIn', JSON.stringify(false));

    this.router.navigate(['/onboarding/login']);
  }
}
