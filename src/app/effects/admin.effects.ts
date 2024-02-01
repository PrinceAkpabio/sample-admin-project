import { Injectable } from '@angular/core';
import { UserProfile } from 'src/app/models/user-models';

@Injectable()
export class AdminEffects {
  users!: UserProfile[];
  activeAdmin!: UserProfile;
  lastApprovedUserIndex!: number;

  constructor() {
    // Get users from local storage if any exists
    this.users =
      JSON.parse(localStorage.getItem('Users') as string) === null
        ? []
        : JSON.parse(localStorage.getItem('Users') as string);
    this.lastApprovedUserIndex = -1; // Index of the last user who approved another user
    this.activeAdmin = JSON.parse(localStorage.getItem('activeUser') as string); // Get active admin
  }

  signUp(user: UserProfile) {
    this.users.push(user);
    localStorage.setItem('Users', JSON.stringify(this.users)); // Store the updated user array
    return user;
  }

  approveUser(adminUserId: number, userToApproveUserId: number) {
    // Find the admin user
    const admin = this.users.find(
      (user) => user.id === adminUserId && user.admin
    );
    if (!admin) {
      alert('Error: Admin not found or does not have admin privileges');
      return false;
    }

    // Find the user to approve
    const userToApprove = this.users.find(
      (user) => user.id === userToApproveUserId && !user.approved
    );
    if (!userToApprove) {
      alert('Error: User not found or already approved');
      return false;
    }

    // Ensure the default admin can only approve the subsequently created user
    if (admin.defaultAdmin && this.users[1].id !== userToApprove.id) {
      alert(
        'Error: Default admin can only approve the subsequently created user'
      );
      return false;
    }

    // Approve the user and make an admin
    userToApprove.approved = true;
    userToApprove.admin = true;

    // Make the user to be approved a child of the active admin
    userToApprove.adminId = admin.id;

    // Update the last approved user index
    this.lastApprovedUserIndex = this.users.indexOf(userToApprove);

    // Store the updated user list
    localStorage.setItem('Users', JSON.stringify(this.users));

    alert(
      `User ${userToApprove.first_name} has been approved by ${admin.first_name}`
    );

    return true;
  }
}
