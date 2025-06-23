import { Component, inject, OnInit } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Router } from '@angular/router';
import {NgIf} from '@angular/common';
import { Blog } from '../../interfaces/blog';
import { BlogsService } from '../../services/blogs/blogs.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    Sidebar,
    FormsModule,
    NgIf
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  blogChunks: Blog[][] = [];
  showCarousel: boolean = true;

  blogsService = inject(BlogsService);
  router = inject(Router);
  selectedCategory: string = 'All';
  searchQuery: string = '';

  ngOnInit() {
    this.blogsService.getAllBlogs().subscribe((data: Blog[]) => {
      this.blogs = data;
      this.filteredBlogs = this.getFilteredBlogs();
      this.blogChunks = this.chunkBlogs(this.filteredBlogs, 3);
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
    const query = this.searchQuery.toLowerCase();
    if (query) {
      this.filteredBlogs = this.blogs.filter(blog =>
        blog.title.toLowerCase().includes(query) ||
        blog.content.toLowerCase().includes(query)
      );
    } else {
      this.filteredBlogs = this.getFilteredBlogs();
    }
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
}
