import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Navbar} from './components/navbar/navbar';
import {Store} from '@ngrx/store';
import {loadBlogs} from './state/blogs/blog.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private store = inject(Store);
  protected title = 'BlogApplication';
  ngOnInit() {
    this.store.dispatch(loadBlogs());
  }
}
