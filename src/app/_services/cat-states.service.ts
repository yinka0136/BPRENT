import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from '../config/endpoints';

@Injectable({
  providedIn: 'root',
})
export class CatStatesService {
  constructor(private http: HttpClient) {}

  fetchAllStates() {
    return this.http.get(`${environment.API_URL}/${endpoints.fetchAllStates}`);
  }

  fetchAllRegions(code) {
    return this.http.get(
      `${environment.API_URL}/${endpoints.fetchRegions}/${code}/regions`
    );
  }
  getAllCategories() {
    return this.http.get(
      `${environment.API_URL}/${endpoints.getAllCategories}`
    );
  }

  getAllSubCategories(slug) {
    return this.http.get(
      `${environment.API_URL}/${endpoints.getAllSubcategories}/${slug}/sub_categories`
    );
  }

  getCategory(slug) {
    return this.http.get(
      `${environment.API_URL}/${endpoints.getCategory}/${slug}`
    );
  }

  updateCategory(payload, slug) {
    return this.http.put(
      `${environment.API_URL}/${endpoints.updateCategory}/${slug}/update`,
      payload
    );
  }

  deleteCategory(slug) {
    return this.http.delete(
      `${environment.API_URL}/${endpoints.deleteCategory}/${slug}/delete`
    );
  }
  createCategory(payload) {
    return this.http.post(
      `${environment.API_URL}/${endpoints.createCategory}`,
      payload
    );
  }
  createSubCategory(payload, slug) {
    return this.http.post(
      `${environment.API_URL}/${endpoints.createSubCategory}/${slug}/sub_category`,
      payload
    );
  }
}
