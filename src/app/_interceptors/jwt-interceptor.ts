import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { GlobalService } from '../_services/global.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private global: GlobalService,
    private router: Router,
    private _global: GlobalService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('token');
    if (
      req.url.endsWith('login') ||
      req.url.endsWith('register') ||
      req.url.endsWith('send_password_reset') ||
      req.url.includes('email_confirmation')
    ) {
      return next.handle(req);
    }
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` },
    });
    return next.handle(req).pipe(
      catchError((e: any) => {
        this._global.hideSpinner();
        if (e.status == '403') {
          this.router.navigate(['login']);
        } else if (e.status == 0 || e.status == 500) {
          this.global.handleNetworkError();
        } else {
          this.global.hideSpinnerWithErrorMessage(e.error);
          console.log(e.status);
        }

        return throwError(e);
      })
    );
  }
}
