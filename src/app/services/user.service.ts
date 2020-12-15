import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { stringResponse } from '../models/string-reponse';
import { User } from '../models/User';

//const API_URL = 'https://glacial-eyrie-69094.herokuapp.com/epiMage/test/';
const API_URL = 'http://104.237.9.13:8080/epi/epiMage/data/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get<stringResponse>(API_URL + 'all', { responseType: 'json' });
  }

  getUserBoard(): Observable<stringResponse> {
    return this.http.get<stringResponse>(API_URL + 'user', { responseType: 'json' });
  }

  getModeratorBoard(): Observable<stringResponse> {
    return this.http.get<stringResponse>(API_URL + 'mod', { responseType: 'json' });
  }

  getAdminBoard(): Observable<stringResponse> {
    return this.http.get<stringResponse>(API_URL + 'admin', { responseType: 'json' });
  }

  getContributorBoard(): Observable<stringResponse> {
    return this.http.get<stringResponse>(API_URL + 'contributor', {responseType: 'json'});
  }

  getUser(uid:string): Observable<User> {
    return this.http.get<User>(`${API_URL}user/${uid}`);
  }
}
