import { Routes } from '@angular/router';
import {Login} from './components/login/login';
import {Signup} from './components/signup/signup';
import {Home} from './components/home/home';
import {PageNotFound} from './components/page-not-found/page-not-found';
import {authGuard} from './route-guards/auth-guards/auth-guard';
import {authRedirectGuard} from './route-guards/auth-redirect-guards/auth-redirect-guard';
import {Profile} from './components/profile/profile';
import {BlogDetails} from './components/blog-details/blog-details';
import {CreateBlog} from './components/create-blog/create-blog';
import {BlogUpdate} from './components/blog-update/blog-update';

export const routes: Routes = [
  {path: '', component: Login, title: 'Login', canActivate: [authRedirectGuard]},
  {path: 'signup', component: Signup, title: 'Signup', canActivate: [authRedirectGuard]},
  {path: 'home', component: Home, title: 'Home', canActivate: [authGuard]},
  {path: 'profile', component: Profile, canActivate: [authGuard]},
  {path: 'create-blog', component: CreateBlog, canActivate: [authGuard]},
  {path: 'blog-details/:id', component: BlogDetails, canActivate: [authGuard]},
  {path: 'blogs-edit/:id', component: BlogUpdate, canActivate: [authGuard]},
  {path: '**', component: PageNotFound, title: 'PageNotFound'},
];
