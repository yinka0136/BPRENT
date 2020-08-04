import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseStructure } from 'src/app/_models/respose';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-view-ad',
  templateUrl: './view-ad.component.html',
  styleUrls: ['./view-ad.component.scss'],
})
export class ViewAdComponent implements OnInit {
  show: boolean;
  sub: Subscription = new Subscription();
  ratingForm: FormGroup;
  addDetails;
  ad: any;
  relatedAds: any;
  description;
  imageToView;
  reviews = [1, 2, 3, 4];
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _global: GlobalService
  ) {}

  ngOnInit(): void {
    this.initRatingForm();
    this.getResolvedData();
  }

  getResolvedData() {
    this.sub.add(
      this.route.data.subscribe((res) => {
        const response: ResponseStructure = res['resolvedData'].res;
        this.addDetails = response.responseResult;
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
      rating: [1],
      message: [''],
    });
  }
  setImageToView(url) {
    this.imageToView = url;
  }

  togglePhone() {
    this.show = !this.show;
  }
  rateAd() {
    console.log('in');
    this._global.toast('success', 'Thank you for your review &#128521;');
  }
  postAd() {
    this.router.navigate(['ad/post']);
  }
}
