import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser, UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {


  isSubmited = false
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: [''],
      email: ['', [Validators.required]]
    });
  }



  onSubmit() {
    this.isSubmited = true
    if (this.userForm.valid) {

      ///////
      const user = this.userForm.value

      //////
      this.userService.addUser(user)


      this.userForm.reset()
      this.isSubmited = false

    }
  }
}
