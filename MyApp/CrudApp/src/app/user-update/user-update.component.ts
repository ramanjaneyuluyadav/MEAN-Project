import { Component } from '@angular/core';
import { UserServiceService } from '../user-service/user-service.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {
  userForm!: FormGroup
  constructor(private _userServices: UserServiceService) {
    this.userForm = new FormGroup({
      firstName: new FormControl('firstName'),
      lastName: new FormControl('lastName'),
      email: new FormControl('email'),
      phone: new FormControl('phone'),
      address: new FormControl('address')
    });
  }
  onupdate() {
    console.log('user updated!..');
  }
}
