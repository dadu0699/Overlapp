import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';

@Component({
    selector: 'app-editprofile',
    templateUrl: './editProfile.component.html'
})

export class EditProfileComponent implements OnInit {
    public user: {
        idUsuario: 0,
        correo: '',
        contrasena: '',
        nombre: '',
        apellido: '',
        telefono: ''
    };
    public password: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    constructor(
        private _router: Router,
        private _userService: UserService
    ) {
        this.user = {
            idUsuario: 0,
            correo: '',
            contrasena: '',
            nombre: '',
            apellido: '',
            telefono: ''
        };
        this.password = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        };
    }

    ngOnInit() {
        this.user = this._userService.getUser();
    }

    saveChanges() {
        if (this.password.newPassword) {
            this.user.contrasena = this.password.newPassword;
        }

        this._userService.updateUser(this.user.idUsuario, this.user)
            .subscribe(
                res => {
                    if (res) {
                        const u: any[] = [];
                        u.push(this.user);
                        this._userService.setUser(u);
                        this._router.navigate(['/dashboard']);
                    } else {
                        console.log(res);
                    }
                }, err => {
                    console.log(<any>err);
                }
            );
    }
}
