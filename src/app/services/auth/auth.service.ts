import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../../models/user';
import {environment} from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/users`;
  http = inject(HttpClient)

  private loggedIn = false;
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.getAllUsers().pipe(
      map((users: User[])=>{
        const matchedUser = users.find(user=> user.email === email && user.password === password);
        if(matchedUser){
          this.loggedIn = true;
          localStorage.clear();
          localStorage.setItem('user', JSON.stringify(matchedUser));
          return true;
        }
        else{
          this.loggedIn = false;
          return false;
        }
      })
    );
  }

  signup(newUser: User): Observable<boolean> {
    return this.getAllUsers().pipe(
      map((existingUsers: User[])=>{
        return existingUsers.some(user=>user.email === newUser.email);
      }),
      switchMap((emailExists: boolean) => {
        if(emailExists){
          return throwError(() => new Error('Email already registered.'));
        }
        else{
          return this.http.post(this.apiUrl, newUser).pipe(
            map(()=>true)
          )
        }
      })
    )
  }

  updateUser(updatedUser: User): Observable<User> {
    return this.getAllUsers().pipe(
      switchMap((users: User[]) => {
        const userIndex = users.findIndex(user => user.email === updatedUser.email);
        if (userIndex === -1) {
          return throwError(() => new Error('User not found.'));
        }


        const updatedUsers = [...users];
        updatedUsers[userIndex] = updatedUser;

        return this.http.put<User>(`${this.apiUrl}/${updatedUser.id}`, updatedUser).pipe(
          map(() => updatedUser)
        );
      })
    );
  }


  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean{
    return this.loggedIn || !!localStorage.getItem('user');
  }
}
