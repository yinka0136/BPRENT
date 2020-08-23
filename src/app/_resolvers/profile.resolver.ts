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
    const myAds = this._adService.myAds(0, 5);
    const recievedMessages = this._messageService.findAllRecievedMessages(0, 5);
    const sentMessages = this._messageService.findAllSentMessages(0, 5);
    const profile = this._user.userProfile();
    return forkJoin([
      favorites,
      myAds,
      recievedMessages,
      sentMessages,
      profile,
    ]).pipe(
      map((res) => {
        this._global.hideSpinner();
        return {
          favorites: res[0],
          myAds: res[1],
          recievedMessages: res[2],
          sentMessages: res[3],
          profile: res[4],
        };
      }),
      catchError((error) => {
        this._global.hideSpinnerWithErrorMessage(error.error.error);
        return of(error);
      })
    );
  }
}
