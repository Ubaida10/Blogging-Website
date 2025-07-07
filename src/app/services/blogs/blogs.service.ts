import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Blog} from '../../models/blog';
import {environment} from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private apiUrl = `${environment.apiUrl}/blogs`;
  http = inject(HttpClient);

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  getBlogById(id: string):Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  addBlog(blog: Blog): Observable<Blog> {

    return this.http.post<Blog>(this.apiUrl, blog);
  }
  updateBlog(blog: Blog): Observable<Blog>{
    return this.http.patch<Blog>(`${this.apiUrl}/${blog.id}`, blog);
  }

  deleteBlog(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
