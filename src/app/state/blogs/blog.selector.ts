import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlogState } from './blog.reducers';

export const selectBlogState = createFeatureSelector<BlogState>('blogs');


export const selectAllBlogs = createSelector(
  selectBlogState,
  (state) => state.blogs
);


export const selectBlogById = (id: string) => createSelector(
  selectAllBlogs,
  (blogs) => blogs.find(blog => blog.id === id)
);


export const selectBlogFilter = createSelector(
  selectBlogState,
  (state) => state.selectedCategory
);
