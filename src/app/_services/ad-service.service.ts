import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from '../config/endpoints';
import { PagedResponse } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { ResponseStructure } from '../_models/respose';

@Injectable({
  providedIn: 'root',
})
export class AdServiceService {
  constructor(private http: HttpClient) {}
  createAd(formData) {
    // const formData = new FormData();
    // formData.append('adJson', adJson);
    // formData.append('images', images);
    return this.http.post(
      `${environment.API_URL}/${endpoints.createAd}`,
      formData
    );
  }

  fetchAllAds(page, size) {
    const pagedResponse: PagedResponse<any> = new PagedResponse<any>();
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http
      .get<ResponseStructure>(
        `${environment.API_URL}/${endpoints.findAllAds}`,
        { params, observe: 'response' }
      )
      .pipe(
        map((res) => {
          pagedResponse.result = res.body.responseResult;
          if (res.headers.get('pagination') != null) {
            pagedResponse.paginationInfo = JSON.parse(
              res.headers.get('pagination')
            );
          }
          return pagedResponse;
        })
      );
  }

  fetchTrendingAds() {
    return this.http.get(`${environment.API_URL}/${endpoints.trendingAds}`);
  }
  fetchNewAds() {
    return this.http.get(`${environment.API_URL}/${endpoints.newAds}`);
  }
  myAds(page, size) {
    const pagedResponse: PagedResponse<any> = new PagedResponse<any>();
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http
      .get<ResponseStructure>(`${environment.API_URL}/${endpoints.myAds}`, {
        params,
        observe: 'response',
      })
      .pipe(
        map((res) => {
          pagedResponse.result = res.body.responseResult;
          if (res.headers.get('pagination') != null) {
            pagedResponse.paginationInfo = JSON.parse(
              res.headers.get('pagination')
            );
          }
          return pagedResponse;
        })
      );
  }
  savedAds(page, size) {
    const pagedResponse: PagedResponse<any> = new PagedResponse<any>();
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http
      .get<ResponseStructure>(`${environment.API_URL}/${endpoints.savedAds}`, {
        params,
        observe: 'response',
      })
      .pipe(
        map((res) => {
          pagedResponse.result = res.body.responseResult;
          if (res.headers.get('pagination') != null) {
            pagedResponse.paginationInfo = JSON.parse(
              res.headers.get('pagination')
            );
          }
          return pagedResponse;
        })
      );
  }
  findAllPendingAds(page, size) {
    const pagedResponse: PagedResponse<any> = new PagedResponse<any>();
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http
      .get<ResponseStructure>(
        `${environment.API_URL}/${endpoints.findAllPendingAds}`,
        { params, observe: 'response' }
      )
      .pipe(
        map((res) => {
          pagedResponse.result = res.body.responseResult;
          if (res.headers.get('pagination') != null) {
            pagedResponse.paginationInfo = JSON.parse(
              res.headers.get('pagination')
            );
          }
          return pagedResponse;
        })
      );
  }
  findAllActiveAds(page, size) {
    const pagedResponse: PagedResponse<any> = new PagedResponse<any>();
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http
      .get<ResponseStructure>(
        `${environment.API_URL}/${endpoints.findAllActiveAds}`,
        { params, observe: 'response' }
      )
      .pipe(
        map((res) => {
          pagedResponse.result = res.body.responseResult;
          if (res.headers.get('pagination') != null) {
            pagedResponse.paginationInfo = JSON.parse(
              res.headers.get('pagination')
            );
          }
          return pagedResponse;
        })
      );
  }

  updateAd(payload) {
    const formData = new FormData();
    formData.append('adJson', payload.adJson);
    formData.append('images', payload.images);
    return this.http.put(
      `${environment.API_URL}/${endpoints.updateAd}/${payload.slug}/update`,
      formData
    );
  }

  toggleSaveAd(slug) {
    return this.http.get(
      `${environment.API_URL}/${endpoints.toggleSaveAd}/${slug}/toggle_save`
    );
  }

  toggleDisableAd(slug) {
    return this.http.get(
      `${environment.API_URL}/${endpoints.toggleDisabledAd}/${slug}/toggle_disable`
    );
  }
  repostAd(slug) {
    const payload = '';
    return this.http.post(
      `${environment.API_URL}/${endpoints.repostAd}/${slug}/repost`,
      payload
    );
  }
  getAd(slug) {
    return this.http.get(
      `${environment.API_URL}/${endpoints.findOneAd}/${slug}/find`
    );
  }
  deleteAd(slug) {
    return this.http.delete(
      `${environment.API_URL}/${endpoints.deleteAd}/${slug}delete`
    );
  }
  declineAd(slug) {
    const payload = '';
    return this.http.post(
      `${environment.API_URL}/${endpoints.declineAd}/${slug}/decline`,
      payload
    );
  }

  approveAd(slug) {
    const payload = '';
    return this.http.post(
      `${environment.API_URL}/${endpoints.approveAd}/${slug}/approve`,
      payload
    );
  }
  boostAd(slug) {
    const payload = '';
    return this.http.post(
      `${environment.API_URL}/${endpoints.boostAd}/${slug}/boost`,
      payload
    );
  }
  cancelAd(slug) {
    const payload = '';
    return this.http.post(
      `${environment.API_URL}/${endpoints.cancelAd}/${slug}/cancel`,
      payload
    );
  }
}
