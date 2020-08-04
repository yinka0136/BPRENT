import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { CatStatesService } from '../_services/cat-states.service';
import { map, catchError } from 'rxjs/operators';
import { GlobalService } from '../_services/global.service';
import { AdServiceService } from '../_services/ad-service.service';

@Injectable({ providedIn: 'root' })
export class AdDetailResolver implements Resolve<any> {
  constructor(
    private _adService: AdServiceService,
    private _global: GlobalService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const slug = route.paramMap.get('slug');
    this._global.showSpinner();
    return this._adService.getAd(slug).pipe(
      map((res) => {
        this._global.hideSpinner();
        return {
          res,
        };
      }),
      catchError((error) => {
        this._global.hideSpinnerWithErrorMessage(error.error);
        return of(error);
      })
    );
  }
}
