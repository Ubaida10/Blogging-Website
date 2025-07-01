import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Router, RouterLink } from '@angular/router';
import { Blog } from '../../models/blog';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { deleteBlog, setBlogFilter } from '../../state/blogs/blog.actions';
import { selectAllBlogs, selectBlogFilter } from '../../state/blogs/blog.selector';
import { ToastrService } from 'ngx-toastr';
import { Subscription, combineLatest } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    Sidebar,
    FormsModule,
    RouterLink,
    DatePipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {

  router = inject(Router);
  store = inject(Store);
  toaster = inject(ToastrService);

  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  blogChunks: Blog[][] = [];
  showCarousel: boolean = true;
  loading: boolean = true;
  filtering: boolean = false;
  selectedCategory: string = 'All';
  searchQuery: string = '';

  private sub: Subscription = new Subscription();

  ngOnInit() {
    this.sub = combineLatest([
      this.store.select(selectAllBlogs),
      this.store.select(selectBlogFilter)
    ]).subscribe(([blogs, category]) => {
      this.blogs = [...blogs].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
      this.selectedCategory = category;
      this.filteredBlogs = this.getFilteredBlogs();
      this.blogChunks = this.chunkBlogs(this.filteredBlogs, 3);
      this.loading = blogs.length === 0;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  showDetails(id: string) {
    this.router.navigate([`blog-details/${id}`]).then(r => console.log(r));
  }

  getFilteredBlogs(): Blog[] {
    if (this.selectedCategory === 'All') {
      return this.blogs;
    }
    return this.blogs.filter(blog => blog.category === this.selectedCategory);
  }

  onFilterChange(category: string) {
    this.filtering = true;
    this.store.dispatch(setBlogFilter({ category }));

    setTimeout(() => {
      this.filtering = false;
    }, 500);
  }

  onSearchChange() {
    this.filtering = true;
    const categoryFiltered = this.selectedCategory === 'All'
      ? this.blogs
      : this.blogs.filter(blog => blog.category === this.selectedCategory);

    setTimeout(() => {
      this.filteredBlogs = this.applySearch(categoryFiltered, this.searchQuery);
      this.blogChunks = this.chunkBlogs(this.filteredBlogs, 3);
      this.filtering = false;
    }, 500);
  }

  chunkBlogs(array: Blog[], chunkSize: number): Blog[][] {
    const chunks: Blog[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  toggleCarouselView() {
    this.showCarousel = !this.showCarousel;
  }

  applySearch(blogs: Blog[], query: string): Blog[] {
    if (!query) return blogs;
    const lower = query.toLowerCase();
    return blogs.filter(blog =>
      blog.title.toLowerCase().includes(lower) ||
      blog.content.toLowerCase().includes(lower)
    );
  }

  deleteBlog(id: string) {
    const answer = confirm("Are you sure you want to delete this blog?");
    if (!answer) {
      return;
    }
    this.store.dispatch(deleteBlog({ id }));
    this.toaster.error('Blog has been deleted!', 'Error');
  }
}
