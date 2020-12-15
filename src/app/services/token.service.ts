import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { jwtResponse } from '../models/jwt-response';
import { User } from '../models/User';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const BIG_USER_KEY = 'auth-big-user';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    return token;
  }

  public saveUser(user: jwtResponse): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveBigUser(user: User): void {
    window.sessionStorage.removeItem(BIG_USER_KEY);
    window.sessionStorage.setItem(BIG_USER_KEY, JSON.stringify(user));
  }

  public getBigUser(): User {
    const user = window.sessionStorage.getItem(BIG_USER_KEY);
    if (user) {
      return JSON.parse(user);
    } else {
      return new User();
    }
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    } else {
      console.log("token service can't find user");
    }
  }

}
