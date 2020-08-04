import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../_services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private _auth: AuthenticationService, private router: Router) {}
  canActivate(): boolean {
    if (this._auth.loggedIn()) {
      return true;
    }
    this.router.navigate(['login']);
  }
}
