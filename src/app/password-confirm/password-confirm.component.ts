import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ResponseStructure } from '../_models/respose';
import { AuthenticationService } from '../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../_services/global.service';

@Component({
  selector: 'app-password-confirm',
  templateUrl: './password-confirm.component.html',
  styleUrls: ['./password-confirm.component.scss'],
})
export class PasswordConfirmComponent implements OnInit {
  sub: Subscription = new Subscription();
  resetPasswordForm: FormGroup;
  token: any;

  constructor(
    private _auth: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private _global: GlobalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.initPasswordReset();
  }
  initPasswordReset() {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  resetPassword() {
    this._global.showSpinner();
    const payload = this.resetPasswordForm.value;
    payload.token = this.token;
    this.sub.add(
      this._auth.passwordassordReset(payload).subscribe({
        next: (res: ResponseStructure) => {
          console.log(res);
          this._global.globalSuccessHandler(res);
          this.router.navigate(['/login']);
        },
        error: (e) => {
          this._global.globalAuthErrorHandler(e.error);
        },
      })
    );
  }
}
