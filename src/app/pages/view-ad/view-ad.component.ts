import { PaginationInfo } from './../../_models/pagination';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseStructure } from 'src/app/_models/respose';
import { from, Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/_services/global.service';
import { FeedbackService } from 'src/app/_services/feedback.service';
import { ReportService } from 'src/app/_services/report.service';
import { MessageService } from 'src/app/_services/message.service';
import { PagedResponse } from 'src/app/_models/pagination';
import { AdServiceService } from 'src/app/_services/ad-service.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-ad',
  templateUrl: './view-ad.component.html',
  styleUrls: ['./view-ad.component.scss'],
})
export class ViewAdComponent implements OnInit, OnDestroy {
  show: boolean;
  currentDate: Date = new Date();
  sub: Subscription = new Subscription();
  ratingForm: FormGroup;
  reportForm: FormGroup;
  messageForm: FormGroup;
  feedbacks: any[] = [];
  addDetails;
  ad: any;
  relatedAds: any;
  description;
  approved: boolean;
  declined: boolean;
  isEnabled: boolean;
  userSlug;
  userRole;
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
    private _message: MessageService,
    private _ad: AdServiceService,
    private location: Location
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit(): void {
    this.initRatingForm();
    this.initReportForm();
    this.initMessageForm();
    this.getResolvedData();
    this.userSlug = JSON.parse(localStorage.getItem('user')).slug;
    this.userRole = JSON.parse(localStorage.getItem('user')).role;
    if (this.ad.status == 'DISABLED') {
      this.isEnabled = false;
    }
    if (this.ad.status == 'APPROVED') {
      this.isEnabled = true;
    }
    window.scroll(0, 444);

    console.log(this.userRole);
  }
  back() {
    this.location.back();
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
  toggleSaveRelated(slug, index, e) {
    e.stopPropagation();
    e.preventDefault();
    this.sub.add(
      this._ad.toggleSaveAd(slug).subscribe({
        next: (res) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: 'success',
            title: res['responseMessage'],
          });
          console.log(res);
          this.relatedAds[index].bookmarked = !this.relatedAds[index]
            .bookmarked;
        },
      })
    );
  }

  approve(slug) {
    this._global.showSpinner();
    this.sub.add(
      this._ad.approveAd(slug).subscribe({
        next: (res: ResponseStructure) => {
          this.approved = true;
          console.log(res);
          this._global.globalSuccessHandler(res);
        },
      })
    );
  }
  decline(slug) {
    this._global.showSpinner();
    this.sub.add(
      this._ad.declineAd(slug).subscribe({
        next: (res: ResponseStructure) => {
          this.declined = true;
          console.log(res);
          this._global.globalSuccessHandler(res);
        },
      })
    );
  }
  enable_disable(slug) {
    this._global.showSpinner();
    this.sub.add(
      this._ad.toggleDisableAd(slug).subscribe({
        next: (res: ResponseStructure) => {
          this.isEnabled = !this.isEnabled;
          console.log(this.isEnabled);
          console.log(res);
          this._global.globalSuccessHandler(res);
        },
      })
    );
  }

  repostAd(slug) {
    this._global.showSpinner();
    this.sub.add(
      this._ad.repostAd(slug).subscribe({
        next: (res: ResponseStructure) => {
          this.approved = true;
          console.log(res);
          this._global.globalSuccessHandler(res);
        },
      })
    );
  }
  async boostAd() {
    const { value: noOfDays } = await Swal.fire({
      title: 'Boost Ad?',
      input: 'number',
      inputPlaceholder: 'No of days',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to specify the number of days!';
        }
      },
      text:
        'this will cost you ' + this.ad.subCategory.coins + ' coins per day',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#2196F3',
      cancelButtonColor: '#D32F2F',
      confirmButtonText: 'Boost!',
    });
    if (noOfDays) {
      console.log(noOfDays);
      this.boost(noOfDays);
    }
  }
  setColor() {}
  boost(noOfDays) {
    console.log(noOfDays);
    this.sub.add(
      this._ad.boostAd(this.ad.slug, noOfDays).subscribe({
        next: (res) => {
          console.log(res);
          Swal.fire('Boosted!', 'Your ad has been boosted.', 'success');
        },
      })
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
