import { Component, inject, OnInit } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import {Router, RouterLink} from '@angular/router';
import { Blog } from '../../models/blog';
import { FormsModule } from '@angular/forms';
import {DatePipe} from '@angular/common';
import {Store} from '@ngrx/store';
import {deleteBlog, loadBlogs} from '../../state/blog.actions';
import {selectAllBlogs} from '../../state/blog.selector';

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
export class Home implements OnInit {
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  blogChunks: Blog[][] = [];
  showCarousel: boolean = true;
  loading: boolean = true;

  router = inject(Router);
  selectedCategory: string = 'All';
  searchQuery: string = '';

  store = inject(Store);

  ngOnInit() {
    this.store.dispatch(loadBlogs());
    this.store.select(selectAllBlogs).subscribe((data: Blog[]) => {
      this.blogs = [...data].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
      this.filteredBlogs = this.getFilteredBlogs();
      this.blogChunks = this.chunkBlogs(this.filteredBlogs, 3);
      this.loading = data?.length === 0;
    });
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
    this.selectedCategory = category;
    this.filteredBlogs = this.getFilteredBlogs();
    this.blogChunks = this.chunkBlogs(this.filteredBlogs, 3);
  }

  onSearchChange() {
    const categoryFiltered = this.selectedCategory === 'All'
      ? this.blogs
      : this.blogs.filter(blog => blog.category === this.selectedCategory);

    this.filteredBlogs = this.applySearch(categoryFiltered, this.searchQuery);
    this.blogChunks = this.chunkBlogs(this.filteredBlogs, 3);
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
    this.store.dispatch(deleteBlog({ id }));
    this.router.navigate(['/home']).then(r => console.log(r));
  }
}
