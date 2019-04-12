import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{environment} from '../../environments/environment';
import { User } from '../models/user';
import { Login } from '../models/login';


@Injectable()
export class AuthService {


  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(username: string, password: string): Observable<any> {
    const url = `${environment.serverBaseURL}/login`;
    console.log(username);
    return this.http.post<Login>(url, {username, password});
  }

  register(user:User): Observable<User> {
    const url = `${environment.serverBaseURL}/register`;
    return this.http.post<User>(url,user);
  }
}