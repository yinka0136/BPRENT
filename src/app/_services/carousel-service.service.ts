import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { endpoints } from '../config/endpoints';

@Injectable({
  providedIn: 'root',
})
export class CarouselServiceService {
  constructor(private http: HttpClient) {}
  fetchAllCarouselImages() {
    return this.http.get(
      `${environment.API_URL}/${endpoints.getAllCarouselImages}`
    );
  }

  async addCarouselImage(formData) {
    return await this.http.post(
      `${environment.API_URL}/${endpoints.addCarouselImages}`,
      formData
    );
  }
  async deleteCarouselImage(id) {
    return await this.http.delete(
      `${environment.API_URL}/${endpoints.deleteOneCarouselImage}/${id}`
    );
  }
  findoneCarouselImage(slug) {
    return this.http.get(
      `${environment.API_URL}/${endpoints.findOneCarouselImage}/${slug}`
    );
  }
}
