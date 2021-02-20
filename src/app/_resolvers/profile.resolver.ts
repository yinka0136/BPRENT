import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { CatStatesService } from '../_services/cat-states.service';
import { map, catchError } from 'rxjs/operators';
import { GlobalService } from '../_services/global.service';
import { AdServiceService } from '../_services/ad-service.service';
import { MessageService } from '../_services/message.service';
import { UsersService } from '../_services/users.service';

@Injectable({ providedIn: 'root' })
export class ProfileResolver implements Resolve<any> {
  constructor(
    private _global: GlobalService,
    private _adService: AdServiceService,
    private _messageService: MessageService,
    private _user: UsersService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this._global.showSpinner();
    const favorites = this._adService.savedAds(0, 5);
    const myAds = this._adService.myAds(1, 5);
    const pending = this._adService.findAllPendingAds(1, 10);
    const disabled = this._adService.findAllDisabledAds(1, 10);
    const approved = this._adService.findAllApprovedAds(1, 10);
    const declined = this._adService.findAllDeclinedAds(1, 10);
    const expired = this._adService.findAllExpiredAds(1, 10);
    const closed = this._adService.findAllClosedAds(1, 10);
    const recievedMessages = this._messageService.findAllRecievedMessages(1, 5);
    const sentMessages = this._messageService.findAllSentMessages(1, 5);
    const profile = this._user.userProfile();
    return forkJoin([
      favorites,
      myAds,
      pending,
      disabled,
      approved,
      declined,
      expired,
      closed,
      recievedMessages,
      sentMessages,
      profile,
    ]).pipe(
      map((res) => {
        this._global.hideSpinner();
        return {
          favorites: res[0],
          myAds: res[1],
          pending: res[2],
          disabled: res[3],
          approved: res[4],
          declined: res[5],
          expired: res[6],
          closed: res[7],
          recievedMessages: res[8],
          sentMessages: res[9],
          profile: res[10],
        };
      }),
      catchError((error) => {
        this._global.hideSpinnerWithErrorMessage(error.error.error);
        return of(error);
      })
    );
  }
}
