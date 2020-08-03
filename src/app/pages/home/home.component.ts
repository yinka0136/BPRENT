import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseStructure } from 'src/app/_models/respose';
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
  trendigAds: any[] = [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      console.log(res);
      const result = res['resolvedData'];
      this.categories = result['categories'];
      this.newAds = result['newAds'];
      this.trendigAds = result['trendigAds'];
    });
  }
  ngOnDestroy(): void {}
}
