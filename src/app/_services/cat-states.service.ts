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
  getAllCategoriesWithSubCategories() {
    return this.http.get(
      `${environment.API_URL}/${endpoints.getAllCategoriesWithSub}`
    );
  }

  getAllSubCategories(slug) {
    return this.http.get(
      `${environment.API_URL}/${endpoints.getAllSubcategories}/${slug}/all`
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
  updateSubCategory(payload, slug) {
    return this.http.put(
      `${environment.API_URL}/${endpoints.updateSubcategory}/${slug}/update`,
      payload
    );
  }

  deleteCategory(slug) {
    return this.http.delete(
      `${environment.API_URL}/${endpoints.deleteCategory}/${slug}/delete`
    );
  }
  deleteSubCategory(slug) {
    return this.http.delete(
      `${environment.API_URL}/${endpoints.deleteSubcategory}/${slug}/delete`
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
      `${environment.API_URL}/${endpoints.createSubCategory}/${slug}/create`,
      payload
    );
  }
}
