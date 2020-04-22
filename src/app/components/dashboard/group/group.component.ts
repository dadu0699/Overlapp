import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../../services/user.service';
import { PublicationService } from '../../../services/publication.service';
import { ChannelService } from '../../../services/channel.service';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html'
})

export class GroupComponent implements OnInit {
    public channelID: number;
    public user: any;
    public publications: any[];
    public publication: {
        contenido: '',
        idUsuario: '',
        idCanal: ''
    };
    public channel: {
        nombreCanal: '',
        descripcion: ''
    };

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _userService: UserService,
        private _publicationService: PublicationService,
        private _channelService: ChannelService
    ) {
        this.publication = {
            contenido: '',
            idUsuario: '',
            idCanal: ''
        };
        this.channel = {
            nombreCanal: '',
            descripcion: ''
        };
    }

    ngOnInit() {
        this.user = this._userService.getUser();
        this._activatedRoute.params.subscribe(
            params => {
                this.channelID = params['id'];
            }
        );
        this.getPublications();
        this.getChannel();
    }

    getChannel() {
        this._channelService.getChannel(this.channelID)
            .subscribe(
                res => {
                    if (!res) {
                        console.log(res);
                    } else {
                        this.channel = res;
                    }
                },
                err => {
                    console.log(<any>err);
                }
            );
    }

    getPublications() {
        this._publicationService.getPublications(this.channelID)
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
