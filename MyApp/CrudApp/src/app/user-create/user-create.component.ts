import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../user-service/user-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {
  userForm!: FormGroup
  constructor(private _userservice: UserServiceService) {
    this.userForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl('')
    });
  }

  onsubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
    this._userservice.createUser(this.userForm.value).subscribe({
      next: (res) => {
        console.log('User created successfully!', res);
        alert('New User create Succussfully ');
        this.userForm.reset();

      }, error: (e) => {
        console.error('Error creating user:', e);
      }
    })

  }
}
