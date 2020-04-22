import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PublicacionService {
  private headers: Headers;
  private options;

  uriPublicacion = 'http://localhost:3000/api/v1/publicacion/';
  usuario: any;

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  public getPublicacionesGeneral(idCanal: any) {
    return this.http.get(this.uriPublicacion + idCanal, this.options)
      .map(res => res.json());
  }

  public getPublicaionesUsuario(idPerfil: any) {
    const url = this.uriPublicacion + 'usuario/' + idPerfil;

    return this.http.get(url, this.options)
      .map(res => res.json());
  }

  public nuevoPostGeneral(publicacion: any) {
    const data = JSON.stringify(publicacion);

    return this.http.post(this.uriPublicacion, data, this.options)
      .map(res => {
        return res.json();
      });
  }

  public eliminarPublicacion(idPublicacion: any) {
    const uri = this.uriPublicacion + idPublicacion;

    return this.http.delete(uri, this.options)
      .map(res => {
        return res.json();
      });
  }

  public canalPublicacion(idCanal: any) {
    const uri = 'http://localhost:3000/api/v1/publicacion/' + idCanal;
    return this.http.get(uri, this.options)
      .map(res => {
        return res.json();
      });
  }
}
