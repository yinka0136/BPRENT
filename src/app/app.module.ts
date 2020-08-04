import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PostAdComponent } from './pages/post-ad/post-ad.component';
import { ViewAdComponent } from './pages/view-ad/view-ad.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductGridComponent } from './pages/product-grid/product-grid.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './_interceptors/jwt-interceptor';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { CategoryComponent } from './pages/category/category.component';
import { ModalComponent } from './modal/modal.component';
import { ModalTriggerDirective } from './directives/modal-trigger.directive';
import { JQ_TOKEN } from './shared-services/jQuery/jQuery.service';
import { UploadComponent } from './fileupload/upload/upload.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { AuthGuardService } from './_guards/auth-guard.service';
const jQuery = window['$'];
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
    UploadComponent,
    ModalComponent,
    ShoppingCartComponent,
    ProductListComponent,
    ProductGridComponent,
    PasswordResetComponent,
    EmailConfirmationComponent,
    CategoryComponent,
    ModalTriggerDirective,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    BarRatingModule,
    AngularEditorModule,
    JwtModule.forRoot({
      config: {},
    }),
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    { provide: JQ_TOKEN, useValue: jQuery },
    JwtHelperService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
