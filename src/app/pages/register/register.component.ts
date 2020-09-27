import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
// import { AuthService, SocialUser } from 'angularx-social-login';
// import {
//   FacebookLoginProvider,
//   GoogleLoginProvider,
// } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../_services/auth.service';
import { GlobalService } from 'src/app/_services/global.service';
import { ResponseStructure } from 'src/app/_models/respose';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  // private user: SocialUser;
  authToken: any;
  registrationForm: FormGroup;
  referrer;
  emailExists: any;
  sub: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    // private socialAuth: AuthService,
    private toastr: ToastrService,
    private _global: GlobalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initRegForm();
    this.getReferrerIfExists();
  }
  getReferrerIfExists() {
    const referrer = this.route.snapshot.paramMap.get('referrer');
    console.log(referrer);
    if (referrer == null || referrer == '') {
      return;
    } else {
      this.referrer = referrer;
    }
  }
  initRegForm() {
    this.registrationForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        referrer: [''],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        phoneNumber: [
          '+234',
          [
            Validators.required,
            Validators.pattern(
              '^[+]([0-9]{3})(((8)(0|1))|((7)(0))|((9)(0)))\\d{8}$'
            ),
          ],
        ],
      },
      { Validators: [this.passwordMatchValidator] }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('confirmPassword').value
      ? null
      : { passwordmismatch: true };
  }

  register() {
    let payload = this.registrationForm.value;
    if (this.referrer) {
      payload.referrer = this.referrer;
    }

    console.log(payload);
    this._global.showSpinner();
    this.sub.add(
      this.auth.register(payload).subscribe({
        next: (res: ResponseStructure) => {
          this.registrationForm.reset();
          this._global.hideSpinner();
          this.toastr.success('An email has been sent to you', 'Success');
          console.log(res);
        },
        error: (e) => {
          this._global.hideSpinnerWithErrorMessage(e.error);
          console.log(e);
        },
      })
    );
  }

  // signInWithGoogle(): void {
  //   this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
  //     console.log(userData);
  //     this.authToken = userData.authToken;
  //     this.googleAuth();
  //   });
  // }
  // googleAuth() {
  //   let payload = { access_token: this.authToken };
  //   console.log(payload);
  //   this.auth.googleLogin(payload).subscribe((res) => {
  //     console.log(res);
  //   });
  // }

  // facebookAuth() {
  //   let payload = { access_token: this.authToken };
  //   console.log(payload);
  //   this.auth.facebookLogin(payload).subscribe((res) => {
  //     console.log(res);
  //   });
  // }

  // signInWithFB(): void {
  //   this.socialAuth
  //     .signIn(FacebookLoginProvider.PROVIDER_ID)
  //     .then((userData) => {
  //       console.log(userData);
  //       this.authToken = userData.authToken;
  //       this.facebookAuth();
  //     });
  // }

  signOut(): void {
    // this.socialAuth.signOut();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
