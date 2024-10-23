import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserServiceService } from '../user-service/user-service.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  usersList: any;
  constructor(private _userService: UserServiceService) {
    this.getData();
  }

  getData() {
    this._userService.getUserlist().subscribe({
      next: (resp: any) => {
        this.usersList = resp.result
      }, error: (error) => {
        console.log(error);
      }
    })
  }

  deleteUser(userId: string) {
    const confirmation = confirm('Are you sure you want to delete this user?')
    if (confirmation) {
      this._userService.deleteUser(userId).subscribe({
        next: (res) => {
          console.log('User deleted successfully', res);
          alert('User deleted successfully');
          this.getData()
        }, error: (e) => {
          console.error('Error deleting user', e);
        }
      })
    }
    else {
      // User cancelled the deletion
      alert('User deletion canceled.');
    }
  }
}
