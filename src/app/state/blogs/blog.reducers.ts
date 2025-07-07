import {Blog} from '../../models/blog';
import {createReducer, on} from '@ngrx/store';
import * as BlogActions from './blog.actions';

export interface BlogState {
  blogs: Blog[],
  error: string | null,
  selectedCategory: string
}

const initialState: BlogState = {
  blogs: [],
  error: null,
  selectedCategory: 'All'
}


export const blogReducer = createReducer(
  initialState,

  on(BlogActions.loadBlogSuccess, (state, action)=>{
    return {
      ...state,
      blogs: action.blogs,
      error: null
    };
  }),


  on(BlogActions.loadBlogFailure, (state, action)=>{
    return {
      ...state,
      error: action.error
    };
  }),

  on(BlogActions.createBlogSuccess, (state, action)=>{
    return {
      ...state,
      blogs: [...state.blogs, action.blog],
      error: null
    };
  }),

  on(BlogActions.createBlogFailure, (state, action)=>{
    return {
      ...state,
      error: action.error
    };
  }),

  on(BlogActions.updateBlogSuccess, (state, action)=>{
    const updatedList = state.blogs.map(blog=>{
      if(blog.id === action.blog.id){
        return action.blog;
      }
      else{
        return blog;
      }
    });

    return {
      ...state,
      blogs: updatedList
    };
  }),

  on(BlogActions.deleteBlogSuccess, (state, action)=>{
    const filteredBlogs = state.blogs.filter(blog=>blog.id!==action.id);

    return {
      ...state,
      blogs: filteredBlogs,
      error: null
    };
  }),


  on(BlogActions.setBlogFilter, (state, action) => ({
    ...state,
    selectedCategory: action.category
  })),
);
