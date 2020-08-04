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
})
export class PasswordResetComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  res = false;
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
  }

  initForgotPassword() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendPasswordReset(page?: string) {
    this._global.showSpinner();
    this.email = this.forgotPasswordForm.value.email;
    const payload = { email: this.email };
    console.log(this.email);
    this._auth.sendPasswordReset(payload).subscribe({
      next: (res: ResponseStructure) => {
        this._global.hideSpinner();
        this.res = true;
        this._global.toast(
          'success',
          'A password confirmation email has been sent'
        );
        console.log(res);
      },
      error: (e) => {
        console.log(e.error);
        this._global.hideSpinnerWithErrorMessage(e.error);
      },
    });
  }
}
