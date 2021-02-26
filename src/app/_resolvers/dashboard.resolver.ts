import { CarouselServiceService } from './../_services/carousel-service.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { CatStatesService } from '../_services/cat-states.service';
import { map, catchError } from 'rxjs/operators';
import { GlobalService } from '../_services/global.service';
import { AdServiceService } from '../_services/ad-service.service';

@Injectable({ providedIn: 'root' })
export class DashboardResolver implements Resolve<any> {
  constructor(
    private _category: CatStatesService,
    private _global: GlobalService,
    private _adService: AdServiceService,
    private _carousel: CarouselServiceService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this._global.showSpinner();
    const categories = this._category.getAllCategoriesWithSubCategories();
    const newAds = this._adService.fetchNewAds();
    const trendingAds = this._adService.fetchTrendingAds();
    const boostedAds = this._adService.fetchBoostedAds();
    const carouselImages = this._carousel.fetchAllCarouselImages();
    return forkJoin([
      categories,
      newAds,
      trendingAds,
      boostedAds,
      carouselImages,
    ]).pipe(
      map((res) => {
        this._global.hideSpinner();
        return {
          categories: res[0],
          newAds: res[1],
          trendingAds: res[2],
          boostedAds: res[3],
          carouselImages: res[4],
        };
      }),
      catchError((error) => {
        this._global.hideSpinnerWithErrorMessage(error.error);
        return of(error);
      })
    );
  }
}
