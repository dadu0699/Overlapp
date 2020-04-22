import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Global } from './global';

@Injectable()
export class UserService {
  private headers: Headers;
  private options;
  private url: string;

  constructor(
    private _router: Router,
    private _http: Http
  ) {
    this.url = Global.url;
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getUser() {
    let user = JSON.parse(localStorage.getItem('user'));
    user = user[0];
    return user;
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  addUser(user: any) {
    const data = JSON.stringify(user);

    return this._http.post(this.url + 'api/v1/usuario/', data, this.options)
      .map(
        res => {
          return res.json();
        }
      );
  }

  addUserTeam(user: any) {
    const data = JSON.stringify(user);

    return this._http.post(this.url + 'api/v1/equipo/', data, this.options)
      .map(
        res => {
          return res.json();
        }
      );
  }

  updateUser(id: number, user: any) {
    const data = JSON.stringify(user);

    return this._http.put(this.url + 'api/v1/usuario/' + id, data, this.options)
      .map(
        res => {
          return res.json();
        }
      );
  }

  saveStorage(res) {
    const token = res.token;
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(res.usuario));
      this._router.navigate(['/dashboard']);
    } else {
      return false;
    }
  }

  authenticate(user: any) {
    const data = JSON.stringify(user);

    return this._http.post(this.url + 'auth/', data, this.options)
      .map(res => res.json());
  }

  verifyUser(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}
