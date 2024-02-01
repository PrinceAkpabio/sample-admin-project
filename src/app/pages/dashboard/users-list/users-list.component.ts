import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/user-models';
import { UserEffects } from 'src/app/effects/user.effects';
import { AdminEffects } from 'src/app/effects/admin.effects';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  usersList!: UserProfile[];
  activeUser!: UserProfile;

  constructor(
    private userEffects: UserEffects,
    private adminEffects: AdminEffects,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeUser = JSON.parse(localStorage.getItem('activeUser') as string);
    this.fetchUsersList();
  }

  fetchUsersList() {
    this.usersList = JSON.parse(localStorage.getItem('Users') as string);
  }

  routeToSingleUserPage(userId: number) {
    this.router.navigate(['/dashboard/user'], {
      queryParams: { id: userId },
    });
  }

  approveUserAsAdmin(user: UserProfile) {
    const isUserApproved = this.adminEffects.approveUser(
      this.activeUser.id,
      user.id
    );
    if (isUserApproved) {
      this.fetchUsersList();
    }
  }

  logout() {
    this.userEffects.logOutUser();
  }
}
