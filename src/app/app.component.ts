import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserFormComponent } from "./components/user-form/user-form.component";
import { UserTableComponent } from "./components/user-table/user-table.component";
import { IUser } from './services/user.service';
import { EditUserFormComponent } from "./components/edit-user-form/edit-user-form.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserFormComponent, UserFormComponent, UserTableComponent, UserTableComponent, EditUserFormComponent, NgIf],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isDarkMode = false;
  isEditMode = false
  currentUser: IUser | null = null

  ngOnInit() {
    this.loadTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
      document.documentElement.classList.add(this.isDarkMode ? 'dark' : 'light');
    }
  }

  changeCreateMode() {
    this.isEditMode = false
  }

  editUser(user: IUser) {
    this.currentUser = user
    this.isEditMode = true
  }


}
