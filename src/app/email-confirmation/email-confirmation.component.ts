import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from '../_services/global.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/auth.service';
import { AuthService } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseStructure } from '../_models/respose';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss'],
})
export class EmailConfirmationComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  tokenExpired: boolean = false;
  token: any;
  accessToken: any;
  user: any;
  sub: Subscription = new Subscription();
  tokenResendForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private _global: GlobalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initTokenResetForm();
    this.token = this.route.snapshot.paramMap.get('token');
    this.confirm();
  }
  initTokenResetForm() {
    this.tokenResendForm = this.fb.group({
      email: ['', [Validators.required]],
    });
  }
  resend() {
    this._global.showSpinner();
    const payload = this.tokenResendForm.value;
    this.auth.resendEmailConfirmation(payload).subscribe({
      next: (res: ResponseStructure) => {
        this._global.hideSpinnerWithMessage(res, 'success');
        console.log(res);
      },
      error: (e: ResponseStructure) => {
        this._global.hideSpinnerWithErrorMessage(e);
        console.log(e);
      },
    });
  }

  confirm() {
    console.log(this.token);
    this.isLoading = true;
    this.auth.emailConfirmation(this.token).subscribe({
      next: (res: ResponseStructure) => {
        this._global.globalSuccessHandler(res);
        console.log(res);
        this.user = res.responseResult['user'];
        this.accessToken = res.responseResult['token'];
        this.isLoading = false;
        this._global.showSpinner();
        this.login();
      },
      error: (e) => {
        this.tokenExpired = true;
        console.log(e);
      },
    });
  }

  login() {
    localStorage.setItem('token', this.accessToken);
    this.router.navigate(['home']);
    this._global.hideSpinner();
    console.log('logged in successfully');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
