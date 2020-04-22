import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';
import { PublicationService } from '../../../services/publication.service';
import { ChannelService } from '../../../services/channel.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
    public user: any;
    public publications: any[];
    public publication: {
        contenido: '',
        idUsuario: '',
        idCanal: ''
    };
    public channels: any[];

    constructor(
        private _router: Router,
        private _userService: UserService,
        private _publicationService: PublicationService,
        private _channelService: ChannelService
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
        this.getChannels();
    }

    getPublications() {
        this._publicationService.getUserPublications(this.user.idPerfil)
            .subscribe(
                res => {
                    if (!res) {
                        console.log(res);
                    } else {
                        this.publications = res;
                    }
                },
                err => {
                    console.log(<any>err);
                }
            );
    }

    getChannels() {
        this._channelService.getChannels(this.user.idPerfil)
            .subscribe(
                res => {
                    if (!res) {
                        console.log(res);
                    } else {
                        this.channels = res;
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

    deletePublication(id: number) {
        this._publicationService.deletePublication(id)
            .subscribe(
                res => {
                    if (res.mensaje === 'publicacion eliminado') {
                        this.getPublications();
                    } else {
                        console.log(res);
                    }
                },
                err => {
                    console.log(<any>err);
                }
            );
    }
}
