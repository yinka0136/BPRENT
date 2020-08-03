import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  group,
  style,
  query,
  animate,
} from '@angular/animations';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/_services/global.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/auth.service';
import { ResponseStructure } from 'src/app/_models/respose';
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('verify-password-reset-token => forgot-password', [
        group([
          query(
            ':enter',
            [
              style({ transform: 'translateX(calc((-100vw + 335px)))' }),
              animate('0.35s ease-in-out', style({ transform: 'none' })),
            ],
            { optional: true }
          ),
        ]),
      ]),

      transition('forgot-password => verify-password-reset-token', [
        group([
          query(
            ':enter',
            [
              style({ transform: 'translateX(calc((100vw + 335px)))' }),
              animate('0.3s ease-in-out', style({ transform: 'none' })),
            ],
            { optional: true }
          ),
        ]),
      ]),

      transition('verify-password-reset-token => password-reset', [
        group([
          query(
            ':enter',
            [
              style({ transform: 'translateX(calc((100vw + 335px)))' }),
              animate('0.3s ease-in-out', style({ transform: 'none' })),
            ],
            { optional: true }
          ),
        ]),
      ]),

      transition('password-reset => verify-password-reset-token', [
        group([
          query(
            ':enter',
            [
              style({ transform: 'translateX(calc((-100vw + 335px)))' }),
              animate('0.3s ease-in-out', style({ transform: 'none' })),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
})
export class PasswordResetComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  passwordResetToken: FormGroup;
  resetPasswordForm: FormGroup;
  currentPage = 'forgot-password';
  email: any;
  sub: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _global: GlobalService,
    private _auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initForgotPassword();
    this.initPasswordReset();
  }

  initForgotPassword() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  initPasswordReset() {
    this.resetPasswordForm = this.fb.group({
      new_password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  scrollUp() {
    window.scroll(0, 0);
  }
  setPage(page?: string) {
    if (page === 'password-reset') {
      this.sendPasswordReset(page);
    } else if (page === 'forgot-password') {
      this.currentPage = page;
      this.scrollUp;
    } else {
      this.resetPassword();
    }
  }

  sendPasswordReset(page?: string) {
    this._global.showSpinner();
    this.email = this.forgotPasswordForm.value.email;
    const payload = { email: this.email };
    console.log(this.email);
    this._auth.sendPasswordReset(payload).subscribe({
      next: (res: ResponseStructure) => {
        this._global.globalSuccessHandler(res);
        console.log(res);
        this.currentPage = page;
        this.scrollUp();
      },
      error: (e) => {
        console.log(e.error);
        this._global.hideSpinnerWithErrorMessage(e.error);
      },
    });
  }

  resetPassword(page?: string) {
    this._global.showSpinner();
    const payload = this.resetPasswordForm.value;
    payload.token = this._auth.passwordassordReset(payload).subscribe({
      next: (res: ResponseStructure) => {
        console.log(res);
        this._global.globalSuccessHandler(res);
        this.router.navigate(['/login']);
      },
      error: (e) => {
        this._global.globalAuthErrorHandler(e.error);
      },
    });
  }
}
