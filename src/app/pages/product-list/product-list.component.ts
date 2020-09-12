import { Router } from '@angular/router';
import { CatStatesService } from 'src/app/_services/cat-states.service';
import { ResponseStructure } from 'src/app/_models/respose';
import { Subscription } from 'rxjs';
import { PaginationInfo } from './../../_models/pagination';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AdServiceService } from 'src/app/_services/ad-service.service';
import { GlobalService } from 'src/app/_services/global.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  currentDate: Date = new Date();
  min: number;
  max: number;
  sub: Subscription = new Subscription();
  ads: any[] = [];
  filteredAds: any[] = [];
  categories: any[] = [];
  keyword: string;
  paginationInfo: PaginationInfo;
  constructor(
    private _ad: AdServiceService,
    private _global: GlobalService,
    private _cat: CatStatesService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }
  ngOnInit(): void {
    this.getAds();
    this.getAllCategories();
  }

  getAllCategories() {
    this._global.showSpinner();
    this.sub.add(
      this._cat.getAllCategories().subscribe({
        next: (res: ResponseStructure) => {
          console.log(res);
          this._global.hideSpinner();
          this.categories = res.responseResult;
        },
      })
    );
  }
  getAds() {
    this.sub.add(
      this._ad.getData().subscribe({
        next: (res) => {
          console.log(res);
          this.ads = this.filteredAds = res.ads;
          this.paginationInfo = res.paginationInfo;
          this.keyword = res.keyword;
        },
      })
    );
  }
  pageChanged(event) {
    this._global.showSpinner();
    this.sub.add(
      this._ad.search(event, 5, this.keyword).subscribe({
        next: (res: ResponseStructure) => {
          console.log(res);
          this._global.hideSpinner();
          this.ads = this.filteredAds = res.responseResult['ads'];
          this.paginationInfo = res.responseResult['paginationInfo'];
        },
      })
    );
  }

  filterAdByPriceRange() {
    console.log(this.min, this.max);
    this.ads =
      this.min && this.max
        ? this.filteredAds.filter(
            (a) => a.dailyPrice >= this.min && a.dailyPrice <= this.max
          )
        : this.filteredAds;
  }

  getFilter(event) {
    console.log(event);
    if (event === 'negotiable') {
      this.ads = event
        ? this.filteredAds.filter((a) => a.negotiable)
        : this.filteredAds;
    } else if (event === 'latest') {
      this.ads = event
        ? this.filteredAds.filter((a) => a.dateCreated == this.currentDate)
        : this.filteredAds;
      console.log(this.ads);
    } else if (event === 'highest') {
      this.ads = event
        ? this.filteredAds.sort(function (a, b) {
            return b.dailyPrice - a.dailyPrice;
          })
        : this.filteredAds;
    } else if (event === 'lowest') {
      this.ads = event
        ? this.filteredAds.sort(function (a, b) {
            return a.dailyPrice - b.dailyPrice;
          })
        : this.filteredAds;
    } else if (event === 'boosted') {
      this.ads = event
        ? this.filteredAds.filter((a) => a.boosted)
        : this.filteredAds;
    }
  }
  ngOnDestroy() {}
}
