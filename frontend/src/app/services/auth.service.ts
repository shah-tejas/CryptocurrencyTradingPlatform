import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{environment} from '../../environments/environment';
import { User } from '../models/user';


@Injectable()
export class AuthService {


  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${environment.serverBaseURL}/login`;
    return this.http.post<User>(url, {email, password});
  }

  signUp(email: string, password: string): Observable<User> {
    const url = `${environment.serverBaseURL}/register`;
    return this.http.post<User>(url, {email, password});
  }
}