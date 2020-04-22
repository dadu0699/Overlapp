import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Global } from './global';

@Injectable()
export class UsuarioService {
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

  public autenticar(usuario: any) {
    const data = JSON.stringify(usuario);

    this._http.post(this.url + 'auth/', data, this.options)
      .subscribe(res => {
        this.guardarStorage(res.json());
      }, error => {
        console.log(error.text());
      });
  }

  public verificarUsuario(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  public resgistrar(usuario: any) {
    const data = JSON.stringify(usuario);

    this._http.post(this.url + 'api/v1/usuario/', data, this.options).subscribe(res => {
      this.guardarStorage(res.json());
    }, error => {
      console.log(error.text());
    });
  }

  public guardarStorage(res) {
    const token = res.token;
    if (token) {
      // console.log('Si existe el token');
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(res.usuario));
      this._router.navigate(['/dashboard']);
    } else {
      // console.log('No existe token');
      return false;
    }
  }

  public getUsuario(): any {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    usuario = usuario[0];
    return usuario;
  }

  public setUsuario(usuario: any): any {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  public editarUsuario(usuario: any, idUsuario: any) {
    const data = JSON.stringify(usuario);

    return this._http.put(this.url + 'api/v1/usuario/' + idUsuario, data, this.options)
      .map(res => {
        this.setUsuario(res.json());
        return res.json()[0];
      });
  }

  public obtenercanales(idPerfil: any) {
    return this._http.get(this.url + 'api/v1/canal/' + idPerfil, this.options)
      .map(res => {
        return res.json();
      });
  }
}
