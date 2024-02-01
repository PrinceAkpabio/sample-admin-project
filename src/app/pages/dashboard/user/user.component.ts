import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from 'src/app/models/user-models';
import { UserEffects } from 'src/app/effects/user.effects';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user!: UserProfile | null;
  isUpdateUser: boolean = false;
  updateUserForm!: FormGroup;
  activeUser!: UserProfile;
  usersInStorage!: UserProfile[];
  baseUrl: string = environment.baseUrl;
  constructor(
    private userEffects: UserEffects,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeUser = JSON.parse(localStorage.getItem('activeUser') as string);
    this.usersInStorage = JSON.parse(localStorage.getItem('Users') as string);

    this.initializeUpdateUserForm();
    this.route.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.fetchUser(params.id);
      }
    });
  }

  fetchUser(userId: number) {
    const userInStorage = this.usersInStorage.filter(
      (user) => user.id === Number(userId)
    );
    this.user = userInStorage[0];
  }

  initializeUpdateUserForm() {
    this.updateUserForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
    });
  }

  toggleUpdateUserForm() {
    this.isUpdateUser = !this.isUpdateUser;
  }

  updateUser() {
    this.userEffects
      .handleUpdateUserProfile(
        this.user?.id as number,
        this.updateUserForm.value
      )
      .subscribe((response) => {
        this.usersInStorage = JSON.parse(
          localStorage.getItem('Users') as string
        );
        this.fetchUser(this.user?.id as number);
        this.isUpdateUser = !this.isUpdateUser;
        alert('User profile updated successfully');
      });
  }

  deleteUser() {
    this.userEffects
      .handleDeleteUserProfile(this.user?.id as number)
      .subscribe((response) => {
        this.router.navigate(['/dashboard/users']);
        alert('User profile deleted successfully');
      });
  }

  logout() {
    this.userEffects.logOutUser();
  }
}
