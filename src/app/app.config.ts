import {
  ApplicationConfig,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { blogReducer } from './state/blogs/blog.reducers';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { BlogEffects } from './state/blogs/blog.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ blogs: blogReducer }),
    provideEffects([BlogEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      trace: true,
      traceLimit: 75,
      actionsBlocklist: [
        '[BlogModel] Load Blogs'
      ]
    })
  ]
};
