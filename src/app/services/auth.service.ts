import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthService implements CanActivate {

  constructor(
    private _userService: UserService
  ) { }

  canActivate() {
    if (this._userService.verifyUser()) {
      return true;
    } else {
      return false;
    }
  }
}
