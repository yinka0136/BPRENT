import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private user: SocialUser;
  authToken: any;
  sub: Subscription = new Subscription();
  loginForm: FormGroup;
  fieldTextType: boolean;
  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private socialAuth: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
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

  login() {
    const payload = this.loginForm.value;
    this.auth.login(payload).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }

  signOut(): void {
    this.socialAuth.signOut();
  }
}
