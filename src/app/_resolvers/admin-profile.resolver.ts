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
    return forkJoin([profile, allAds]).pipe(
      map((res) => {
        this._global.hideSpinner();
        return {
          profile: res[0],
          allAds: res[1],
        };
      }),
      catchError((error) => {
        this._global.hideSpinnerWithErrorMessage(error.error.error);
        return of(error);
      })
    );
  }
}
