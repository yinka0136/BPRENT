import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from '../config/endpoints';

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  constructor(private http: HttpClient) {}

  buyCoins(payload) {
    return this.http.post(
      `${environment.API_URL}/${endpoints.buyCoins}`,
      payload
    );
  }
}
