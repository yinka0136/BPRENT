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
export class MessageService {
  constructor(private http: HttpClient) {}
  fetchAllMessages(page, size) {
    const pagedResponse: PagedResponse<any> = new PagedResponse<any>();
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http
      .get<ResponseStructure>(
        `${environment.API_URL}/${endpoints.getAllMessages}`,
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
  findAllSentMessages(page, size) {
    const pagedResponse: PagedResponse<any> = new PagedResponse<any>();
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http
      .get<ResponseStructure>(
        `${environment.API_URL}/${endpoints.getAllSentMessages}`,
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
  findAllRecievedMessages(page, size) {
    const pagedResponse: PagedResponse<any> = new PagedResponse<any>();
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http
      .get<ResponseStructure>(
        `${environment.API_URL}/${endpoints.getAllRecievedMessages}`,
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

  deleteMessage(id) {
    return this.http.delete(
      `${environment.API_URL}/${endpoints.deleteMessage}/${id}delete`
    );
  }
  findMessage(id) {
    return this.http.get(
      `${environment.API_URL}/${endpoints.getMessage}/${id}/all`
    );
  }

  createMessage(payload, slug) {
    return this.http.post(
      `${environment.API_URL}/${endpoints.createMessage}/${slug}/create`,
      payload
    );
  }
}
