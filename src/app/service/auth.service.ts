import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from '../config/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

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
    return this.http.post(
      `${environment.API_URL}/${endpoints.token}/`,
      payload
    );
  }
}
