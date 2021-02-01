import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { CatStatesService } from '../_services/cat-states.service';
import { map, catchError } from 'rxjs/operators';
import { GlobalService } from '../_services/global.service';
import { AdServiceService } from '../_services/ad-service.service';
import { FeedbackService } from '../_services/feedback.service';

@Injectable({ providedIn: 'root' })
export class AdDetailResolver implements Resolve<any> {
  constructor(
    private _adService: AdServiceService,
    private _global: GlobalService,
    private _feedBack: FeedbackService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const slug = route.paramMap.get('slug');
    const userSlug = route.paramMap.get('userSlug');
    this._global.showSpinner();
    const ad = this._adService.getAd(slug);
    const feedbacks = this._feedBack.findUserFeedback(0, 4, userSlug);
    return forkJoin([ad, feedbacks]).pipe(
      map((res) => {
        this._global.hideSpinner();
        return {
          ad: res[0],
          feedbacks: res[1],
        };
      }),
      catchError((error) => {
        this._global.hideSpinnerWithErrorMessage(error.error);
        return of(error);
      })
    );
  }
}
