import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { endpoints } from '../config/endpoints';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  fetchAllReports() {
    return this.http.get(`${environment.API_URL}/${endpoints.getAllreports}`);
  }
  findAllSentReports() {
    return this.http.get(
      `${environment.API_URL}/${endpoints.getAllSentreports}`
    );
  }

  deleteReport(id) {
    return this.http.delete(
      `${environment.API_URL}/${endpoints.deletereport}/${id}delete`
    );
  }
  findReportByAd(adSlug) {
    return this.http.get(
      `${environment.API_URL}/${endpoints.getreportByAd}/${adSlug}/all`
    );
  }

  createReport(payload, slug) {
    return this.http.post(
      `${environment.API_URL}/${endpoints.createreport}/${slug}/create`,
      payload
    );
  }
}
