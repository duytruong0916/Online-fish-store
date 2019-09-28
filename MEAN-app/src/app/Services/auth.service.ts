import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "../account/user-model";
import { Subject } from 'rxjs';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isDone;
  private tokenTimer;
  private authtoken: string;
  private isAuthenticated = false;
  private lastname: string;
  authStatusListener = new Subject<boolean>();
  authNamelistener = new Subject<string>();
  user: User;
  constructor(private http: HttpClient,
              private router: Router) { }

  /* Get the user Information*/
  getProfile(user) {
    return this.http.post<any>('http://localhost:3000/api/user/profile', user)
  }
  /* Create a new user */
  Register(user): Observable<{ success: boolean, msg: string }> {
    return this.http.post<{ success: boolean, msg: string }>('http://localhost:3000/api/user/register', user)
  }
  Login():Observable<{ success: boolean, msg: string }>{
    return this.http.get<{ success: boolean, msg: string }>('http://localhost:3000/api/user/login')
  }
  /* Authenticate the user-Login */
  Authenticate(userinfo): Observable<{user: any, success: boolean, token: string, msg: string, expirationTime: number }>{
    const Url ='http://localhost:3000/api/user/authenticate';
    return this.http.post<{user: any, success: boolean, token: string, msg: string, expirationTime: number }>(Url, userinfo);
  }
  logOut() {
    this.authtoken = null;
    this.user = null;
    this.authStatusListener.next(false);
    this.authNamelistener.next(null);
    clearTimeout(this.tokenTimer);
    this.clearUserData()
    window.location.reload();
  }
  getToken() {
    return this.authtoken;
  }
  setIsAuthenticated(params){
    this.isAuthenticated = params;
  }
  setLastname(params){
    this.lastname = params;
  }
  getIsAuthenticated() {
    return this.isAuthenticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getUserlastname() {
    if (!this.lastname) {
      return 'Unknown'
    }
    return this.lastname;
  }
  getAuthNameListener(){
    return this.authNamelistener.asObservable();
  }
  storeUserData(token: string, expirationTime: Date, lastname: string) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('lastname', lastname);
    localStorage.setItem('expiration', expirationTime.toISOString());
    this.authtoken = token;
  }
  clearUserData() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('lastname');
  }
  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiredIn = authInfo.expirationDate.getTime() - now.getTime();
    console.log(expiredIn)
    if (expiredIn > 0) {
      this.lastname = authInfo.lastname;
      this.authtoken = authInfo.token;
      this.setAuthTimer(expiredIn / 1000);
      this.authStatusListener.next(true);
      this.authNamelistener.next(this.lastname);
      this.isAuthenticated = true;
    }
  }
  setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000)
  }
  getAuthData() {
    const lastname = localStorage.getItem('lastname');
    const token = localStorage.getItem('id_token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate || !lastname) {
      return;
    }
    return {
      lastname: lastname,
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }
}
