import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BlogsService} from '../../services/blogs/blogs.service';
import * as BlogActions from './blog.actions';
import {catchError, mergeMap, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class BlogEffects{
  actions$  = inject(Actions);
  blogService = inject(BlogsService);

  loadBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadBlogs),
      mergeMap(() =>
        this.blogService.getAllBlogs().pipe(
          map(blogs => {
            console.log('Blogs loaded from API:', blogs);
            return BlogActions.loadBlogSuccess({ blogs });
          }),
          catchError(error => of(BlogActions.loadBlogFailure({ error })))
        )
      )
    )
  );

  addBlog$ = createEffect(()=>
    this.actions$.pipe(
      ofType(BlogActions.createBlog),
      mergeMap(action=>
        this.blogService.addBlog(action.blog).pipe(
          map(blog=>BlogActions.createBlogSuccess({ blog })),
          catchError(error=>of(BlogActions.createBlogFailure({ error })))
        )
      )
    )
  );

  updateBlog$ = createEffect(()=>
    this.actions$.pipe(
      ofType(BlogActions.updateBlog),
      mergeMap(action=>
        this.blogService.updateBlog(action.blog).pipe(
          map(blog=>BlogActions.updateBlogSuccess({ blog })),
          catchError(error=>of(BlogActions.updateBlogFailure({ error })))
        )
      )
    )
  );

  deleteBlog$ = createEffect(()=>
    this.actions$.pipe(
      ofType(BlogActions.deleteBlog),
      mergeMap(action=>
        this.blogService.deleteBlog(action.id).pipe(
          map(() => BlogActions.deleteBlogSuccess({ id: action.id })),
          catchError(error => of(BlogActions.deleteBlogFailure({ error })))
        )
      )
    )
  );
}
