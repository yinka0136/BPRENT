import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from '../config/endpoints';
import { ResponseStructure } from '../_models/respose';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  userProfile() {
    return this.http.get<ResponseStructure>(
      `${environment.API_URL}/${endpoints.usersProfile}`
    );
  }
  uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http.put(
      `${environment.API_URL}/${endpoints.uploadAvatar}`,
      formData
    );
  }

  updatePassword(payload) {
    return this.http.put(
      `${environment.API_URL}/${endpoints.passwordUpdate}`,
      payload
    );
  }

  updateProfile(payload) {
    return this.http.patch(
      `${environment.API_URL}/${endpoints.updateUsers}`,
      payload
    );
  }

  createAdmin(payload) {
    return this.http.post(
      `${environment.API_URL}/${endpoints.createAdmin}`,
      payload
    );
  }
}
