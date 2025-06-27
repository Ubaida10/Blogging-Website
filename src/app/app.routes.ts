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
  {
    path: '',
    loadComponent: ()=> import('./components/login/login').then(m => m.Login),
    title: 'Login',
    canActivate: [authRedirectGuard]
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/signup/signup').then(m => m.Signup),
    title: 'Signup',
    canActivate: [authRedirectGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home').then(m => m.Home),
    title: 'Home',
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/profile/profile').then(m => m.Profile),
    title: 'Profile',
    canActivate: [authGuard]
  },
  {
    path: 'create-blog',
    loadComponent: () => import('./components/create-blog/create-blog').then(m => m.CreateBlog),
    title: 'Create BlogModel',
    canActivate: [authGuard]
  },
  {
    path: 'blog-details/:id',
    loadComponent: () => import('./components/blog-details/blog-details').then(m => m.BlogDetails),
    title: 'BlogModel Details',
    canActivate: [authGuard]
  },
  {
    path: 'blogs-edit/:id',
    loadComponent: () => import('./components/blog-update/blog-update').then(m => m.BlogUpdate),
    title: 'Update BlogModel',
    canActivate: [authGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./components/page-not-found/page-not-found').then(m => m.PageNotFound),
    title: 'PageNotFound'
  },
];
