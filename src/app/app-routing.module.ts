import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';

import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import {AddBlogComponent} from './components/add-blog/add-blog.component'

import {DetailComponent} from './components/detail/detail.component'
import {HomeComponent} from './components/home/home.component'
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '',component:HomeComponent },
  { path: 'blog-detail/:id',component:DetailComponent },

  { path: 'add-blog', component: AddBlogComponent },
  { path: 'edit-blog/:id', component: EditBlogComponent },
  { path: 'blog-list',component:BlogListComponent },

  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: '**', redirectTo: '/404' }, 
  { path: '404', component: NotFoundComponent } 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}