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
export class FeedbackService {
  constructor(private http: HttpClient) {}

  fetchAllFeedbacks(page, size) {
    const pagedResponse: PagedResponse<any> = new PagedResponse<any>();
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http
      .get<ResponseStructure>(
        `${environment.API_URL}/${endpoints.getAllFeedBacks}`,
        { params, observe: 'response' }
      )
      .pipe(
        map((res) => {
          pagedResponse.result = res.body.responseResult;

          return pagedResponse;
        })
      );
  }
  findAllSentFeedbacks(page, size) {
    const pagedResponse: PagedResponse<any> = new PagedResponse<any>();
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http
      .get<ResponseStructure>(
        `${environment.API_URL}/${endpoints.getAllSentFeedBacks}`,
        { params, observe: 'response' }
      )
      .pipe(
        map((res) => {
          pagedResponse.result = res.body.responseResult;

          return pagedResponse;
        })
      );
  }
  findAllRecievedFeedbacks(page, size) {
    const pagedResponse: PagedResponse<any> = new PagedResponse<any>();
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http
      .get<ResponseStructure>(
        `${environment.API_URL}/${endpoints.getAllRecievedFeedBacks}`,
        { params, observe: 'response' }
      )
      .pipe(
        map((res) => {
          console.log(res);
          pagedResponse.result = res.body.responseResult;
          return pagedResponse;
        })
      );
  }

  updateFeedback(payload, id) {
    return this.http.put(
      `${environment.API_URL}/${endpoints.updateFeedBack}/${id}/update`,
      payload
    );
  }
  deleteFeedback(id) {
    return this.http.delete(
      `${environment.API_URL}/${endpoints.deleteFeedBack}/${id}delete`
    );
  }
  findUserFeedback(page, size, userSlug) {
    const pagedResponse: PagedResponse<any> = new PagedResponse<any>();
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http
      .get<ResponseStructure>(
        `${environment.API_URL}/${endpoints.getUserFeedBack}/${userSlug}/all`,
        { params, observe: 'response' }
      )
      .pipe(
        map((res) => {
          pagedResponse.result = res.body.responseResult;
          return pagedResponse;
        })
      );
  }

  createFeedback(payload, slug) {
    return this.http.post(
      `${environment.API_URL}/${endpoints.createFeedBack}/${slug}/create`,
      payload
    );
  }
}
