import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { PostAdComponent } from './post-ad/post-ad.component';
import { ViewAdComponent } from './view-ad/view-ad.component';
import { RoutingModule } from './routing.module';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      '648266134944-pbb0c4elfgnt1ka81m47pmlmgl8jtb4b.apps.googleusercontent.com'
    ),
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1061592434258551'),
  },
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PostAdComponent,
    ViewAdComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    SocialLoginModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
