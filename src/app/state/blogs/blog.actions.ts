import {createAction, props} from '@ngrx/store';
import {Blog} from '../../models/blog';


export const loadBlogs = createAction('[BlogModel] Load Blogs');
export const loadBlogSuccess = createAction('[BlogModel] Load Blogs Success',props<{blogs: Blog[]}>());
export const loadBlogFailure = createAction('[BlogModel] Load Blogs Failure', props<{error: string}>());



export const createBlog = createAction('[BlogModel] Create BlogModel', props<{blog: Blog}>());
export const createBlogSuccess = createAction('[BlogModel] Create BlogModel Success', props<{blog: Blog}>());
export const createBlogFailure = createAction('[BlogModel] Create BlogModel Failure', props<{error: string}>());


export const updateBlog = createAction('[BlogModel] Update BlogModel', props<{blog: Blog}>());
export const updateBlogSuccess = createAction('[BlogModel] Update BlogModel Success', props<{blog: Blog}>());
export const updateBlogFailure = createAction('[BlogModel] Update BlogModel Failure', props<{error: string}>());



export const deleteBlog = createAction('[BlogModel] Delete BlogModel', props<{id: string}>());
export const deleteBlogSuccess = createAction('[BlogModel] Delete BlogModel Success', props<{id: string}>());
export const deleteBlogFailure = createAction('[BlogModel] Delete BlogModel Failure', props<{error: string}>());



export const setBlogFilter = createAction('[BlogModel] Set Blog Filter', props<{ category: string }>());
