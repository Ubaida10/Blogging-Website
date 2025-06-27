import {Blog} from '../models/blog';
import {createReducer, on} from '@ngrx/store';
import * as BlogActions from './blog.actions';

export interface BlogState {
  blogs: Blog[],
  error: string | null
}

const initialState: BlogState = {
  blogs: [],
  error: null
}


export const blogReducer = createReducer<BlogState>(
  initialState,
  on(BlogActions.loadBlogSuccess, (state, { blogs })=>({
    ...state,
    blogs
  })),

  on(BlogActions.loadBlogFailure, (state, {error})=>({
    ...state,
    error
  })),

  on(BlogActions.createBlogSuccess, (state, { blog }) =>({
    ...state,
    blogs: [...state.blogs, blog]
  })),

  on(BlogActions.updateBlogSuccess, (state, { blog })=>({
    ...state,
    blogs: state.blogs.map(b=>b.id === blog.id ? blog : b)
  })),

  on(BlogActions.deleteBlogSuccess, (state, { id }) => ({
    ...state,
    blogs: state.blogs.filter(blog => blog.id !== id)
  }))
);
