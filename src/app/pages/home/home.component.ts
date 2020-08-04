import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  categories: any[] = [];
  newAds: any[] = [];
  sub: Subscription = new Subscription();
  trendingAds: any[] = [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      console.log(res);
      const result = res['resolvedData'];
      this.categories = result['categories'].responseResult;
      this.newAds = result['newAds'].responseResult;
      this.trendingAds = result['trendingAds'].responseResult;
    });
  }
  ngOnDestroy(): void {}
}
