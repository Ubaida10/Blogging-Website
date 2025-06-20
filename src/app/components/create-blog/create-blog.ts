import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BlogsService } from '../../services/blogs/blogs.service';
import { Router } from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
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
  selectedFile: File | null = null;

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
      imageFile: [''] // we handle file manually
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.blogForm.patchValue({ image: reader.result });
    };

    if (file) reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.blogForm.invalid) return;

    // Build a plain object from form values
    const blogData = {
      id: uuidv4(),
      title: this.blogForm.value.title.toString(),
      content: this.blogForm.value.content.toString(),
      author: this.blogForm.value.author.toString(),
      category: this.blogForm.value.category.toString(),
      publishDate: new Date(),
      lastUpdated: new Date(),
      // Optionally, handle image as base64 if needed
      image: this.blogForm.value.image || null
    };

    this.blogService.addBlog(blogData).subscribe({
      next: () => {
        console.log('Blog created successfully');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Blog creation failed:', err);
      }
    });
  }
}
