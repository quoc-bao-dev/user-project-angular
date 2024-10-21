import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser, UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-user-form.component.html',
  styleUrl: './edit-user-form.component.css'
})
export class EditUserFormComponent implements OnInit {

  @Output() onEdited = new EventEmitter()
  @Input() currentUser: IUser | null = null

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

  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(this.currentUser?.firstName),
      lastName: new FormControl(this.currentUser?.lastName),
      email: new FormControl(this.currentUser?.email),
      address: new FormControl(this.currentUser?.address)
    });
  }

  onSubmit() {
    this.isSubmited = true
    if (this.userForm.valid) {
      const user: IUser = { id: this.currentUser?.id, ...this.userForm.value }
      this.userService.updateUser(user)
      this.userForm.reset()
      this.isSubmited = false
      this.onEdited.emit()
    }
  }

  edited() {
    this.onEdited.emit()
  }
}
