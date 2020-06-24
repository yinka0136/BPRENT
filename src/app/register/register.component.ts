import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service/auth.service';
import { AuthService, SocialUser } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private user: SocialUser;
  authToken: any;
  registrationForm: FormGroup;
  emailExists: any;
  sub: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private socialAuth: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initRegForm();
  }

  initRegForm() {
    this.registrationForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        referrer: [''],
        password: ['', Validators.required, Validators.minLength(8)],
        confirmPassword: ['', Validators.required],
      },
      { Validators: [this.passwordMatchValidator] }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('confirmPassword').value
      ? null
      : { passwordmissmatch: true };
  }

  register() {
    let payload = this.registrationForm.value;
    console.log(payload);
    this.spinner.show();
    this.sub.add(
      this.auth.register(payload).subscribe({
        next: (res) => {
          this.spinner.hide();
          console.log(res);
        },
      })
    );
  }

  signInWithGoogle(): void {
    this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      console.log(userData);
      this.authToken = userData.authToken;
      this.googleAuth();
    });
  }
  googleAuth() {
    let payload = { access_token: this.authToken };
    console.log(payload);
    this.auth.googleLogin(payload).subscribe((res) => {
      console.log(res);
    });
  }

  facebookAuth() {
    let payload = { access_token: this.authToken };
    console.log(payload);
    this.auth.facebookLogin(payload).subscribe((res) => {
      console.log(res);
    });
  }

  signInWithFB(): void {
    this.socialAuth
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((userData) => {
        console.log(userData);
        this.authToken = userData.authToken;
        this.facebookAuth();
      });
  }

  signOut(): void {
    this.socialAuth.signOut();
  }

  ngOnDestroy() {}
}
