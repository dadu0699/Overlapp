import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Global } from './global';

@Injectable()
export class PublicationService {
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

  getPublications(id: number) {
    return this._http.get(this.url + 'api/v1/publicacion/' + id, this.options)
      .map(res => res.json());
  }

  getUserPublications(id: number) {
    return this._http.get(this.url + 'api/v1/publicacion/usuario/' + id, this.options)
      .map(res => res.json());
  }

  addPublication(publication: any) {
    const data = JSON.stringify(publication);

    return this._http.post(this.url + 'api/v1/publicacion/', data, this.options)
      .map(
        res => {
          return res.json();
        }
      );

  }

  updatePublication(id: number, publication: any) {
    const data = JSON.stringify(publication);

    return this._http.put(this.url + 'api/v1/publicacion/' + id, data, this.options)
      .map(
        res => {
          return res.json();
        }
      );
  }

  deletePublication(id: number) {
    return this._http.delete(this.url + 'api/v1/publicacion/' + id, this.options)
      .map(
        res => {
          return res.json();
        }
      );
  }
}
