import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GlobalService } from '../_services/global.service';
import { AdServiceService } from '../_services/ad-service.service';
import { CatStatesService } from '../_services/cat-states.service';

@Injectable({ providedIn: 'root' })
export class AdEditResolver implements Resolve<any> {
  constructor(
    private _adService: AdServiceService,
    private _global: GlobalService,
    private _category: CatStatesService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const slug = route.paramMap.get('slug');
    this._global.showSpinner();
    const ad = this._adService.getAd(slug);
    const categories = this._category.getAllCategories();
    const states = this._category.fetchAllStates();
    return forkJoin([categories, states, ad]).pipe(
      map((res) => {
        this._global.hideSpinner();
        return {
          categories: res[0],
          states: res[1],
          ad: res[2],
        };
      }),
      catchError((error) => {
        this._global.hideSpinnerWithErrorMessage(error.error);
        return of(error);
      })
    );
  }
}
