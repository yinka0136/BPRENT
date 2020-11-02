import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AuthService, SocialUser } from 'angularx-social-login';
// import {
//   FacebookLoginProvider,
//   GoogleLoginProvider,
// } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../../_services/auth.service';
import { GlobalService } from 'src/app/_services/global.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // private socialUser: SocialUser;
  user: any;
  authToken: any;
  token;
  sub: Subscription = new Subscription();
  loginForm: FormGroup;
  fieldTextType: boolean;
  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    // private socialAuth: AuthService,
    private _global: GlobalService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // signInWithGoogle(): void {
  //   this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
  //     console.log(userData);
  //     this.authToken = userData.authToken;
  //     this.googleAuth();
  //   });
  // }
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

  // signInWithFB(): void {
  //   this.socialAuth
  //     .signIn(FacebookLoginProvider.PROVIDER_ID)
  //     .then((userData) => {
  //       console.log(userData);
  //       this.authToken = userData.authToken;
  //       this.facebookAuth();
  //     });
  // }

  login() {
    this._global.showSpinner();
    const payload = this.loginForm.value;
    this.auth.login(payload).subscribe({
      next: (res) => {
        this._global.hideSpinner();
        console.log(res);
        this.token = res['token'];
        this.user = res['user'];
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        if(this.user.role == 'SUPER_ADMIN' || this.user.role == 'ADMIN'){
          this.router.navigate(['a-profile']);
        }
        else{
          this.router.navigate(['profile']);
        }
        
      },
      error: (e) => {
        this._global.hideSpinner();
        this.toast.error(e.error.message);
        console.log(e);
      },
    });
  }

  signOut(): void {
    // this.socialAuth.signOut();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
