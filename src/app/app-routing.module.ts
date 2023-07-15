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
import { CategoryComponent } from './components/category/category.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '',component:HomeComponent },
  { path: 'blog-detail/:id',component:DetailComponent },
  { path: 'category/:category', component: CategoryComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },

  { path: 'add-blog', component: AddBlogComponent,canActivate: [AuthGuard]},
  { path: 'edit-blog/:id', component: EditBlogComponent,canActivate: [AuthGuard] },
  { path: 'blog-list',component:BlogListComponent,canActivate: [AuthGuard] },

  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent,canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent,canActivate: [AuthGuard]},
  { path: 'verify-email-address', component: VerifyEmailComponent,canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/404' }, 
  { path: '404', component: NotFoundComponent } 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}