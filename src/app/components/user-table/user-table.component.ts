import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IUser, UserService } from '../../services/user.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements OnInit {
  users: IUser[] = []
  @Output() editUser = new EventEmitter()
  @Output() cancelEdit = new EventEmitter()

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users
    })
  }

  onEditUser(user: IUser) {
    this.editUser.emit(user)
  }

  onCancelEdit() {
    this.cancelEdit.emit()
  }

  deleteUser(id: string | number) {
    this.userService.deleteUser(id)
  }
}
