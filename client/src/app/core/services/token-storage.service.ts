import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../shared/models/user.model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  // logout
  signOut(): void {
    window.localStorage.clear();
  }

  // token save in localstorage
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  // get token
  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  // user save
  public saveUser(user: User): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // get user
  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  // this function check user is login or not by token in localstorage
  public isAuthenticated(): boolean {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
      const decoded: any = jwtDecode(token);
      // console.log(decoded.exp);
      // console.log(Math.floor(Date.now() / 1000));
      if (Math.floor(Date.now() / 1000) > decoded.exp) {
        window.localStorage.removeItem(USER_KEY);
        window.localStorage.removeItem(TOKEN_KEY);
        return false;
      }
      return true;
    }
    return false;
  }
}
