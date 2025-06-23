import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {BlogsService} from '../../services/blogs/blogs.service';
import {Blog} from '../../interfaces/blog';
import {catchError, Observable, of, tap} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AsyncPipe, DatePipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-blog-details',
  imports: [
    AsyncPipe,
    DatePipe,
    NgIf,
    RouterLink
  ],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css'
})
export class BlogDetails implements OnInit {
  route = inject(ActivatedRoute);
  blogService = inject(BlogsService);
  router = inject(Router);

  blog!:Observable<Blog|undefined>;

  ngOnInit(){
    this.blog = this.route.paramMap.pipe(
      switchMap(params=>{
        const id = params.get('id')?.toString();
        if(!id){
          return of(undefined);
        }
        return this.blogService.getBlogById(id).pipe(
          tap(()=>{
            console.log("blog details fetched successfully");
          }),
          catchError(err => of(undefined))
        )
      })
    )
  }

  deleteBlog(id: string) {
    this.blogService.deleteBlog(id).pipe(
      tap(() => {
        console.log("Blog deleted successfully");
        this.router.navigate(['/home']).then(r => console.log());
      }),
      catchError(err => {
        console.error("Error deleting blog:", err);
        return of(null);
      })
    ).subscribe()
  }
}
