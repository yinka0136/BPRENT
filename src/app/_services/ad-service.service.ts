import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from '../config/endpoints';
import { PagedResponse, PaginationInfo } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { ResponseStructure } from '../_models/respose';
import { Observable, BehaviorSubject } from 'rxjs';
import { Ad } from '../_models/ad';

@Injectable({
  providedIn: 'root',
})
export class AdServiceService {
  private initialData: Ad = {
    ads: [],
    paginationInfo: {
      number: 0,
      size: 0,
      currentPage: 0,
      totalElements: 0,
      totalPages: 0,
    },
    keyword: '',
  };
  private dataTracker = new BehaviorSubject<Ad>(this.initialData);
  constructor(private http: HttpClient) {}

  getData(): Observable<Ad> {
    return this.dataTracker.asObservable();
  }
  setData(response: {
    ads: [];
    paginationInfo: {
      number: 0;
      size: 0;
      currentPage: 0;
      totalElements: 0;
      totalPages: 0;
    };
    keyword: '';
  }): void {
    this.dataTracker.next(response);
  }

  /** Resets the count to the initial value */
  resetData(): void {
    this.dataTracker.next(this.initialData);
  }
  createAd(formData) {
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

  updateAd(formData, slug) {
    return this.http.patch(
      `${environment.API_URL}/${endpoints.updateAd}/${slug}/update`,
      formData
    );
  }

  toggleSaveAd(slug) {
    let payload = {};
    return this.http.post(
      `${environment.API_URL}/${endpoints.toggleSaveAd}/${slug}/toggle_save`,
      payload
    );
  }

  toggleDisableAd(slug) {
    const payload = {};
    return this.http.post(
      `${environment.API_URL}/${endpoints.toggleDisabledAd}/${slug}/toggle_disable`,
      payload
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
      `${environment.API_URL}/${endpoints.deleteAd}/${slug}/delete`
    );
  }
  deleteAdImage(imageId) {
    return this.http.delete(
      `${environment.API_URL}/${endpoints.deleteAdImage}/${imageId}/delete`
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
  boostAd(slug, days) {
    const params = new HttpParams().set('days', days);
    return this.http.get(
      `${environment.API_URL}/${endpoints.boostAd}/${slug}/boost`,
      { params }
    );
  }
  cancelAd(slug) {
    const payload = '';
    return this.http.post(
      `${environment.API_URL}/${endpoints.cancelAd}/${slug}/cancel`,
      payload
    );
  }

  search(page, size, query) {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page)
      .set('size', size);
    return this.http.get(`${environment.API_URL}/${endpoints.search}`, {
      params,
    });
  }

  searchAdBySubCategory(payload) {
    const params = new HttpParams()
      .set('page', payload.page)
      .set('size', payload.size);

    return this.http.get(
      `${environment.API_URL}/${endpoints.searchBySubcategory}/${payload.slug}/search`,
      {
        params,
      }
    );
  }
}
