import {  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// route will need changed when working locally and live version
const AUTH_API = 'http://tarkovmapselector.herokuapp.com:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  temp: any;

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      password,
      numOfSpins: 0,
      numOfFactory: 0,
      numOfWoods: 0,
      numOfCustoms: 0,
      numOfInterchange: 0,
      numOfReserve: 0,
      numOfShoreline: 0,
      numOfLab: 0,
      favorites: []
    }, httpOptions);
  }


  getInfo(username: string): Observable<any> {
    return this.http.post(AUTH_API + 'populateInfo', {
      username
    }, httpOptions)
  }

  updateSpins(username: string): Observable<any> {
    return this.http.post(AUTH_API + 'updateSpin', {
      username
    }, httpOptions)
  }

  updateFactory(username: string): Observable<any> {
    return this.http.post(AUTH_API + 'updateFactory', {
      username
    }, httpOptions)
  }

  updateWoods(username: string): Observable<any> {
    return this.http.post(AUTH_API + 'updateWoods', {
      username
    }, httpOptions)
  }

  updateCustoms(username: string): Observable<any> {
    return this.http.post(AUTH_API + 'updateCustoms', {
      username
    }, httpOptions) 
  }

  updateInterchange(username: string): Observable<any> {
    return this.http.post(AUTH_API + 'updateInterchange', {
      username
    }, httpOptions)
  }

  updateReserve(username: string): Observable<any> {
    return this.http.post(AUTH_API + 'updateReserve', {
      username
    }, httpOptions)
  }

  updateShoreline(username: string): Observable<any> {
    return this.http.post(AUTH_API + 'updateShoreline', {
      username
    }, httpOptions)
  }

  updateLab(username: string): Observable<any> {
    return this.http.post(AUTH_API + 'updateLab', {
      username
    }, httpOptions)
  }

  removeFavorite(username: string, map: string): Observable<any> {
    return this.http.post(AUTH_API + 'removeFavorite', {
      username,
      map
    }, httpOptions)
  }

  addFavorite(username: string, map: string): Observable<any> {
    return this.http.post(AUTH_API + 'addFavorite', {
      username,
      map
    }, httpOptions)
  }

  updateEmail(username: string, nEmail: string): Observable<any> {
    return this.http.post(AUTH_API + 'updateEmail', {
      username,
      nEmail
    })
  }

  updateUsername(username: string, nUsername: string): Observable<any> {
    return this.http.post(AUTH_API + 'updateUsername', {
      username,
      nUsername
    })
  }

}
