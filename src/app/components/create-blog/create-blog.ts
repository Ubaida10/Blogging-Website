import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BlogsService } from '../../services/blogs/blogs.service';
import { Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.html',
  styleUrls: ['./create-blog.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ]
})
export class CreateBlog {
  blogForm: FormGroup;
  categories = ['Sports', 'Cricket', 'Fashion', 'Technology', 'Health'];
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogsService,
    private router: Router
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: ['']  // image in base64 format
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.blogForm.patchValue({ imageUrl: base64 });
      this.imagePreview = base64; // show preview if needed
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.blogForm.invalid) {
      alert('Please fill all required fields');
      return;
    }

    const blogData = {
      id: uuidv4(),
      title: this.blogForm.value.title,
      content: this.blogForm.value.content,
      author: this.blogForm.value.author,
      category: this.blogForm.value.category,
      publishDate: new Date(),
      lastUpdated: new Date(),
      imageUrl: this.blogForm.value.imageUrl || null
    };

    this.blogService.addBlog(blogData).subscribe({
      next: () => {
        alert('Blog created successfully');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Blog creation failed:', err);
        alert('Failed to create blog');
      }
    });
  }
}
