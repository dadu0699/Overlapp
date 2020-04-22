import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';
import { PublicationService } from '../../../services/publication.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    public user: any;
    public publications: any[];
    public publication: {
        contenido: '',
        idUsuario: '',
        idCanal: ''
    };

    constructor(
        private _router: Router,
        private _userService: UserService,
        private _publicationService: PublicationService
    ) {
        this.publication = {
            contenido: '',
            idUsuario: '',
            idCanal: ''
        };
    }

    ngOnInit() {
        this.user = this._userService.getUser();
        this.getPublications();
    }

    getPublications() {
        this._publicationService.getPublications(this.user.idCanal)
            .subscribe(
                res => {
                    if (!res) {
                        console.log(res);
                    } else {
                        this.publications = res[0];
                    }
                },
                err => {
                    console.log(<any>err);
                }
            );
    }

    addPublication() {
        this.publication.idUsuario = this.user.idUsuario;
        this.publication.idCanal = this.user.idCanal;
        this._publicationService.addPublication(this.publication)
            .subscribe(
                res => {
                    if (res.estado !== 'false') {
                        this.getPublications();
                        this.publication.contenido = '';
                    }
                },
                err => {
                    console.log(<any>err);
                }
            );
    }
}
