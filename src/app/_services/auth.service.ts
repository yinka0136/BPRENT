import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from '../config/endpoints';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private _jwt: JwtHelperService
  ) {}

  register(payload) {
    return this.http.post(
      `${environment.API_URL}/${endpoints.register}`,
      payload
    );
  }

  googleLogin(payload) {
    return this.http.post(
      `${environment.API_URL}/${endpoints.googleLogin}/`,
      payload
    );
  }
  facebookLogin(payload) {
    return this.http.post(
      `${environment.API_URL}/${endpoints.facebookLogin}/`,
      payload
    );
  }

  login(payload) {
    return this.http.post(`${environment.API_URL}/${endpoints.login}`, payload);
  }

  sendPasswordReset(payload) {
    return this.http.post(
      `${environment.API_URL}/${endpoints.sendPasswordReset}`,
      payload
    );
  }

  passwordassordReset(payload) {
    return this.http.post(
      `${environment.API_URL}/${endpoints.password_reset}`,
      payload
    );
  }

  resendEmailConfirmation(email) {
    return this.http.post(
      `${environment.API_URL}/${endpoints.resendEmailConfirmation}`,
      email
    );
  }

  emailConfirmation(token) {
    return this.http.get(
      `${environment.API_URL}/${endpoints.confirmEmail}/${token}/confirm_email/`
    );
  }
  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null || !this._jwt.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
