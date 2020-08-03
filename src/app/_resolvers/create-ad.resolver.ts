import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { CatStatesService } from '../_services/cat-states.service';
import { map, catchError } from 'rxjs/operators';
import { GlobalService } from '../_services/global.service';

@Injectable({ providedIn: 'root' })
export class CreateAdResolver implements Resolve<any> {
  constructor(
    private _category: CatStatesService,
    private _global: GlobalService
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this._global.showSpinner();
    const categories = this._category.getAllCategories();
    const states = this._category.fetchAllStates();
    return forkJoin([categories, states]).pipe(
      map((res) => {
        this._global.hideSpinner();
        return {
          categories: res[0],
          states: res[1],
        };
      }),
      catchError((error) => {
        this._global.hideSpinnerWithErrorMessage(error.error);
        return of(error);
      })
    );
  }
}
