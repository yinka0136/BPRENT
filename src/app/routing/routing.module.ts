import { PrivacyComponent } from './../pages/privacy/privacy.component';
import { TermsAndConditionsComponent } from './../pages/terms-and-conditions/terms-and-conditions.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { ViewAdComponent } from '../pages/view-ad/view-ad.component';
import { PostAdComponent } from '../pages/post-ad/post-ad.component';
import { ProductListComponent } from '../pages/product-list/product-list.component';
import { ProductGridComponent } from '../pages/product-grid/product-grid.component';
import { PasswordResetComponent } from '../pages/password-reset/password-reset.component';
import { EmailConfirmationComponent } from '../email-confirmation/email-confirmation.component';
import { CategoryComponent } from '../pages/category/category.component';
import { CreateAdResolver } from '../_resolvers/create-ad.resolver';
import { DashboardResolver } from '../_resolvers/dashboard.resolver';
import { AdDetailResolver } from '../_resolvers/ad-detail.resolver';
import { AuthGuardService } from '../_guards/auth-guard.service';
import { PasswordConfirmComponent } from '../password-confirm/password-confirm.component';
import { EditAdComponent } from '../pages/edit-ad/edit-ad.component';
import { AdEditResolver } from '../_resolvers/ad-edit.resolver';
import { ProfileResolver } from '../_resolvers/profile.resolver';
import { AdminProfileComponent } from '../pages/admin-profile/admin-profile.component';
import { AdminProfileResolver } from '../_resolvers/admin-profile.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: { resolvedData: DashboardResolver },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'password_reset',
    component: PasswordResetComponent,
  },
  {
    path: 'confirm/:token',
    component: EmailConfirmationComponent,
  },
  {
    path: 'reset/:token',
    component: PasswordConfirmComponent,
  },
  {
    path: 'create-category',
    component: CategoryComponent,
  },

  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: { resolvedData: ProfileResolver },
  },
  {
    path: 'a-profile',
    component: AdminProfileComponent,
    resolve: { resolvedData: AdminProfileResolver },
  },
  {
    path: 'ad/view/:slug/:userSlug',
    component: ViewAdComponent,
    resolve: { resolvedData: AdDetailResolver },
  },
  {
    path: 'ad/post',
    component: PostAdComponent,
    canActivate: [AuthGuardService],
    resolve: { resolvedData: CreateAdResolver },
  },
  {
    path: 'ad/edit/:slug',
    component: EditAdComponent,
    canActivate: [AuthGuardService],
    resolve: { resolvedData: AdEditResolver },
  },
  { path: 'products', component: ProductListComponent },
  { path: 'products/grid', component: ProductGridComponent },
  { path: 'terms', component: TermsAndConditionsComponent },
  { path: 'privacy', component: PrivacyComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
