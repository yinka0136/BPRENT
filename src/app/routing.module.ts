import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewAdComponent } from './view-ad/view-ad.component';
import { PostAdComponent } from './post-ad/post-ad.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'ad/view', component: ViewAdComponent },
  { path: 'ad/post', component: PostAdComponent },
  // { path: 'add-quiz/:id/:code', component: AddQuizComponent },
  // { path: 'add-course-module-five', component: AddCourseModuleFiveComponent },
  // { path: 'upload-certificate', component: UploadCertificateComponent },
  // { path: 'course-details/:code', component: CourseDetailsComponent },
  // { path: 'edit-video', component: EditVideoComponent },
  // { path: 'edit-quiz', component: EditQuizComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
