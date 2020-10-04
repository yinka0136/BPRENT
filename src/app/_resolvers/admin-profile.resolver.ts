import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { GlobalService } from '../_services/global.service';
import { AdServiceService } from '../_services/ad-service.service';
import { MessageService } from '../_services/message.service';
import { UsersService } from '../_services/users.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdminProfileResolver implements Resolve<any> {
  constructor(
    private _global: GlobalService,
    private _adService: AdServiceService,
    private _user: UsersService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this._global.showSpinner();
    const profile = this._user.userProfile();
    const allAds = this._adService.fetchAllAds(0, 10);
    const pending = this._adService.findAllPendingAds(0, 10);
    const disabled = this._adService.findAllDisabledAds(0, 10);
    const approved = this._adService.findAllApprovedAds(0, 10);
    const declined = this._adService.findAllDeclinedAds(0, 10);
    const expired = this._adService.findAllExpiredAds(0, 10);
    const closed = this._adService.findAllClosedAds(0, 10);
    return forkJoin([
      profile,
      allAds,
      pending,
      disabled,
      approved,
      declined,
      expired,
      closed,
    ]).pipe(
      map((res) => {
        this._global.hideSpinner();
        return {
          profile: res[0],
          allAds: res[1],
          pending: res[2],
          disabled: res[3],
          approved: res[4],
          declined: res[5],
          expired: res[6],
          closed: res[7],
        };
      }),
      catchError((error) => {
        this._global.hideSpinnerWithErrorMessage(error.error.error);
        return of(error);
      })
    );
  }
}
