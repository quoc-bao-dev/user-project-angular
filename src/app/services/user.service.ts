import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface IUser {
  id: number | number;
  firstName: string;
  lastName: string;
  email: string;
  address: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/person'
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  public users$: Observable<IUser[]> = this.usersSubject.asObservable();
  constructor(private http: HttpClient) {
    this.fetchUsers();  // Tự động tải người dùng khi service được khởi tạo
  }


  fetchUsers(): void {
    this.http.get<IUser[]>(this.apiUrl).subscribe(users => {
      this.usersSubject.next(users);
    });
  }


  getAllUsers(): Observable<IUser[]> {
    return this.users$;
  }

  addUser(user: IUser): void {
    this.http.post<IUser>(this.apiUrl, user).pipe(
      tap(newUser => {
        const currentUsers = this.usersSubject.value;
        this.usersSubject.next([...currentUsers, newUser]);  // Cập nhật BehaviorSubject
      })
    ).subscribe();
  }

  updateUser(updatedUser: IUser): void {
    const url = `${this.apiUrl}/${updatedUser.id}`;
    this.http.put<IUser>(url, updatedUser).pipe(
      tap(() => {
        const currentUsers = this.usersSubject.value;
        const updatedUsers = currentUsers.map(user => user.id === updatedUser.id ? updatedUser : user);
        this.usersSubject.next(updatedUsers);  // Cập nhật BehaviorSubject
      })
    ).subscribe();
  }


  deleteUser(userId: number | string): void {
    const url = `${this.apiUrl}/${userId}`;
    this.http.delete(url).pipe(
      tap(() => {
        const currentUsers = this.usersSubject.value;
        const updatedUsers = currentUsers.filter(user => user.id !== userId);
        this.usersSubject.next(updatedUsers);  // Cập nhật BehaviorSubject
      })
    ).subscribe();
  }
}
