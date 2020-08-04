import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { ViewAdComponent } from '../pages/view-ad/view-ad.component';
import { PostAdComponent } from '../pages/post-ad/post-ad.component';
import { ShoppingCartComponent } from '../pages/shopping-cart/shopping-cart.component';
import { ProductListComponent } from '../pages/product-list/product-list.component';
import { ProductGridComponent } from '../pages/product-grid/product-grid.component';
import { PasswordResetComponent } from '../pages/password-reset/password-reset.component';
import { EmailConfirmationComponent } from '../email-confirmation/email-confirmation.component';
import { CategoryComponent } from '../pages/category/category.component';
import { CreateAdResolver } from '../_resolvers/create-ad.resolver';
import { DashboardResolver } from '../_resolvers/dashboard.resolver';
import { AdDetailResolver } from '../_resolvers/ad-detail.resolver';
import { AuthGuardService } from '../_guards/auth-guard.service';

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
    path: 'create-category',
    component: CategoryComponent,
  },

  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'ad/view/:slug',
    component: ViewAdComponent,
    resolve: { resolvedData: AdDetailResolver },
  },
  {
    path: 'ad/post',
    component: PostAdComponent,
    canActivate: [AuthGuardService],
    resolve: { resolvedData: CreateAdResolver },
  },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/grid', component: ProductGridComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
