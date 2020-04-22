import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    public userSignin: {
        correo: '',
        contrasena: ''
    };
    public userSignup: {
        correo: '',
        contrasena: '',
        nombreEquipo: '',
        nombre: '',
        apellido: '',
        telefono: '',
        contrasenaEquipo: ''
    };
    public userSignupTeam: {
        correo: '',
        contrasena: '',
        nombreEquipo: '',
        nombre: '',
        apellido: '',
        telefono: '',
        contrasenaEquipo: ''
    };
    public login: boolean;
    public team: boolean;

    constructor(
        private _router: Router,
        private _userService: UserService,
        private _authService: AuthService
    ) {
        this.userSignin = {
            correo: '',
            contrasena: ''
        };
        this.userSignup = {
            correo: '',
            contrasena: '',
            nombreEquipo: '',
            nombre: '',
            apellido: '',
            telefono: '',
            contrasenaEquipo: ''
        };
        this.userSignupTeam = {
            correo: '',
            contrasena: '',
            nombreEquipo: '',
            nombre: '',
            apellido: '',
            telefono: '',
            contrasenaEquipo: ''
        };
        this.login = false;
        this.team = false;
    }

    ngOnInit() {
        if (this._authService.canActivate()) {
            this._router.navigate(['/dashboard']);
        }
    }

    signin() {
        this._userService.authenticate(this.userSignin)
            .subscribe(
                res => {
                    this._userService.saveStorage(res);
                },
                err => {
                    console.log(<any>err);
                }
            );
    }

    signup() {
        this._userService.addUser(this.userSignup)
            .subscribe(
                res => {
                    if (res.mensaje === 'te has logeado correctamente') {
                        this._userService.authenticate(this.userSignup)
                            .subscribe(
                                res1 => {
                                    this._userService.saveStorage(res1);
                                },
                                err1 => {
                                    console.log(<any>err1);
                                }
                            );
                    } else {
                        console.log(res);
                    }
                },
                err => {
                    console.log(<any>err);
                }
            );
    }

    signupTeam() {
        this.userSignupTeam.correo = this.userSignup.correo;
        this.userSignupTeam.contrasena = this.userSignup.contrasena;
        this.userSignupTeam.apellido = this.userSignup.apellido;
        this.userSignupTeam.nombre = this.userSignup.nombre;
        this.userSignupTeam.telefono = this.userSignup.telefono;

        this._userService.addUserTeam(this.userSignupTeam)
            .subscribe(
                res => {
                    if (res.estado !== 'false') {
                        this._userService.authenticate(this.userSignupTeam)
                            .subscribe(
                                res1 => {
                                    this._userService.saveStorage(res1);
                                },
                                err1 => {
                                    console.log(<any>err1);
                                }
                            );
                    } else {
                        console.log(res);
                    }
                },
                err => {
                    console.log(<any>err);
                }
            );
    }

    alternateLog() {
        if (this.login) {
            this.login = false;
        } else {
            this.login = true;
        }
    }

    alternateTeam() {
        if (this.team) {
            this.team = false;
        } else {
            this.team = true;
        }
    }
}
