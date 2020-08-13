import { PaginationInfo } from './../../_models/pagination';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseStructure } from 'src/app/_models/respose';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/_services/global.service';
import { FeedbackService } from 'src/app/_services/feedback.service';
import { ReportService } from 'src/app/_services/report.service';
import { MessageService } from 'src/app/_services/message.service';
import { PagedResponse } from 'src/app/_models/pagination';

@Component({
  selector: 'app-view-ad',
  templateUrl: './view-ad.component.html',
  styleUrls: ['./view-ad.component.scss'],
})
export class ViewAdComponent implements OnInit, OnDestroy {
  show: boolean;
  sub: Subscription = new Subscription();
  ratingForm: FormGroup;
  reportForm: FormGroup;
  messageForm: FormGroup;
  feedbacks: any[] = [];
  addDetails;
  ad: any;
  relatedAds: any;
  description;
  userSlug;
  imageToView;
  paginationInfo: PaginationInfo;
  reviews = [1, 2, 3, 4];
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _global: GlobalService,
    private _feedback: FeedbackService,
    private _report: ReportService,
    private _message: MessageService
  ) {}

  ngOnInit(): void {
    this.initRatingForm();
    this.initReportForm();
    this.initMessageForm();
    this.getResolvedData();
    this.userSlug = JSON.parse(localStorage.getItem('user')).slug;
  }

  getResolvedData() {
    this.sub.add(
      this.route.data.subscribe((res) => {
        console.log(res);
        const response = res['resolvedData'];
        const adResponse: ResponseStructure = response.ad;
        const feedBackResponse: PagedResponse<any> = response.feedbacks;
        this.addDetails = adResponse.responseResult;
        this.feedbacks = feedBackResponse.result.feedbacks;
        this.paginationInfo = feedBackResponse.result.paginationInfo;
        this.ad = this.addDetails.ad;
        this.relatedAds = this.addDetails.relatedAds;
        this.imageToView = this.ad.adImages[0].imageUrl;
        this.description = this.ad.description;
        console.log(this.addDetails);
      })
    );
  }
  initRatingForm() {
    this.ratingForm = this.fb.group({
      rating: [],
      message: [''],
    });
  }
  initReportForm() {
    this.reportForm = this.fb.group({
      message: [''],
    });
  }
  initMessageForm() {
    this.messageForm = this.fb.group({
      message: [''],
    });
  }
  setImageToView(url) {
    this.imageToView = url;
  }

  togglePhone() {
    this.show = !this.show;
  }
  navigateFeedbackPage(page: number) {
    console.log(page);
    this.sub.add(
      this._feedback
        .findUserFeedback(
          page,
          this.paginationInfo.totalElements - 1,
          this.ad.user.slug
        )
        .subscribe({
          next: (res: PagedResponse<any>) => {
            this.feedbacks = res.result['feedbacks'];
            this.paginationInfo = res.result['paginationInfo'];
            console.log(res, this.paginationInfo);
          },
        })
    );
  }
  rateAd() {
    const payload = this.ratingForm.value;
    this.sub.add(
      this._feedback.createFeedback(payload, this.ad.user.slug).subscribe({
        next: (res: ResponseStructure) => {
          console.log(res);
          this._global.toast(
            'success',
            'Thank you for your feedback &#128521;'
          );
        },
      })
    );
  }
  reportAd() {
    const payload = this.reportForm.value;
    this.sub.add(
      this._report.createReport(payload, this.ad.slug).subscribe({
        next: (res) => {
          console.log(res);
          this._global.toast(
            'success',
            'Your report has been submitted successfully &#128521;'
          );
        },
      })
    );
  }
  sendMessage() {
    const payload = this.messageForm.value;
    this.sub.add(
      this._message.createMessage(payload, this.ad.user.slug).subscribe({
        next: (res) => {
          console.log(res);
          this._global.toast(
            'success',
            'Your message has been sent successfully &#128521;'
          );
        },
      })
    );
  }
  transformRating(feedback) {
    if (feedback === 1) {
      return 'one';
    } else if (feedback === 2) {
      return 'two';
    } else if (feedback === 3) {
      return 'three';
    } else if (feedback === 4) {
      return 'four';
    } else if (feedback === 5) {
      return 'five';
    }
  }
  postAd() {
    this.router.navigate(['ad/post']);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
