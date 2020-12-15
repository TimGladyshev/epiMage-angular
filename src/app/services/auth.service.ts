import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtResponse } from '../models/jwt-response';
import { stringResponse } from '../models/string-reponse';

//const AUTH_API = 'https://glacial-eyrie-69094.herokuapp.com/epiMage/auth/';
const AUTH_API = 'http://104.237.9.13:8080/epi/epiMage/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<jwtResponse> {
    return this.http.post<jwtResponse>(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<stringResponse> {
    return this.http.post<stringResponse>(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  upgrade(username: string): Observable<stringResponse> {
    return this.http.post<stringResponse>(`${AUTH_API}${username}/contribute`, httpOptions);
  }
}
