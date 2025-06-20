import { Component, inject } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Blog } from '../../interfaces/blog';
import { BlogsService } from '../../services/blogs/blogs.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    Sidebar,
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  blogsService = inject(BlogsService);
  router = inject(Router);
  selectedCategory: string = 'All';
  searchQuery: any;

  constructor() {
    this.blogsService.getAllBlogs().subscribe((data: Blog[])=>{
      this.blogs = data;
      this.filteredBlogs = this.getFilteredBlogs();
    })
  }

  showDetails(id: string){
    this.router.navigate([`blog-details/${id}`]).then(r => console.log(r));
  }

  getFilteredBlogs(): Blog[]  {
    if (this.selectedCategory === 'All') {
      return this.blogs;
    }
    return this.blogs.filter(blog => blog.category === this.selectedCategory);
  }

  onFilterChange($event: string) {
    this.selectedCategory = $event;
    this.filteredBlogs = this.getFilteredBlogs();
  }

  onSearchChange() {
    const query = this.searchQuery?.toLowerCase();
    if(query){
      this.filteredBlogs = this.blogs.filter(blog=>
        blog.title.toLowerCase().includes(query) ||
        blog.content.toLowerCase().includes(query)
      );
    }
    else {
      this.filteredBlogs = this.getFilteredBlogs();
    }
  }
}
