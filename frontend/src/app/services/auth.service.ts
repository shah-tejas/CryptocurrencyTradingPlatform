import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{environment} from '../../environments/environment';
import { User } from '../models/user';
import { Login } from '../models/login';


@Injectable()
export class AuthService {


  constructor(private http: HttpClient) {}

  /**
   * @desc provides the token from the local storage
   * @returns String 
   */
  getToken(): string {
    return localStorage.getItem('token');
  }
/**
 * @desc sends the post request to the server 
 * @param username  that is checked with the email id that is stored in the mongo db
 * @param password  that needs to be checked with password 
 * @returns
 */
  logIn(username: string, password: string): Observable<any> {
    const url = `${environment.serverBaseURL}/login`;
    console.log(username);
    return this.http.post<Login>(url, {username, password});
  }

/**
 * @desc sends the post request to server and saves user details in the mongo  
 * @param user User model
 * @returns
 */
  register(user:User): Observable<User> {
    const url = `${environment.serverBaseURL}/register`;
    return this.http.post<User>(url,user);
  }

  
}