import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Blog} from '../../models/blog';
import { Observable } from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {AsyncPipe, DatePipe} from '@angular/common';
import { selectBlogById } from '../../state/blogs/blog.selector';
import {deleteBlog} from '../../state/blogs/blog.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-blog-details',
  imports: [
    AsyncPipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './blog-details.html',
  styleUrl: './blog-details.css'
})
export class BlogDetails implements OnInit {
  route = inject(ActivatedRoute);
  store = inject(Store);

  router = inject(Router);
  blog$!:Observable<Blog|undefined>;

  ngOnInit(){
    this.blog$ = this.route.paramMap.pipe(
        map(params=>params.get('id')|| ''),
        switchMap(id=>this.store.select(selectBlogById(id)))
    );
  }

  deleteBlog(id: string) {
    const answer = confirm("Are you sure you want to delete this blog?");
    if (!answer) {
      return;
    }
    this.store.dispatch(deleteBlog({ id }));
    this.router.navigate(['/home']).then(r => console.log(r));
  }
}
