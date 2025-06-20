import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  http = inject(HttpClient)

  private loggedIn = false;
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.getAllUsers().pipe(
      map((users: User[])=>{
        this.loggedIn = true;
        return users.some(user=>user.email === email && user.password === password);
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

  isLoggedIn(): boolean{
    return this.loggedIn;
  }
}
