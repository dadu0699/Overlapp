import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Global } from './global';

@Injectable()
export class ChannelService {
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

    getChannels(id: any) {
        return this._http.get(this.url + 'api/v1/canales/' + id, this.options)
            .map(res => res.json());
    }

    getChannel(id: any) {
        return this._http.get(this.url + 'api/v1/canal/' + id, this.options)
            .map(res => res.json());
    }
}
