import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '../../services/blogs/blogs.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Blog } from '../../models/blog';
import {NgClass} from '@angular/common';
import {Store} from '@ngrx/store';
import {updateBlog} from '../../state/blog.actions';

@Component({
  selector: 'app-blog-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './blog-update.html',
  styleUrl: './blog-update.css'
})
export class BlogUpdate implements OnInit {
  blogService = inject(BlogsService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  store = inject(Store);

  blogForm!: FormGroup;
  blogId!: string;
  imagePreview: string | null = null;
  originalBlog!: Blog;
  categories = ['Sports', 'Cricket', 'Fashion', 'Technology', 'Health'];

  ngOnInit() {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });

    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.blogId = id;
      this.blogService.getBlogById(this.blogId).subscribe({
        next: result => {
          this.originalBlog = { ...result };
          this.blogForm.patchValue({
            title: result.title || '',
            content: result.content || '',
            category: result.category || '',
            imageUrl: result.imageUrl || ''
          });
          this.imagePreview = result.imageUrl || null;
        },
        error: error => {
          console.error(error);
          alert("Failed to load blog.");
          this.router.navigate(['/home']).then(r => console.log(r));
        }
      });
    } else {
      alert("Invalid BlogModel Id");
      this.router.navigate(['/home']).then(r => console.log(r));
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.blogForm.patchValue({ imageUrl: base64 });
      this.imagePreview = base64;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const currentValues = this.blogForm.value;
      const hasChanges = this.hasChanges(currentValues, this.originalBlog);

      if (hasChanges) {
        const updatedBlog: Blog = {
          id: this.blogId,
          ...currentValues,
          lastUpdated: new Date()
        };

        this.store.dispatch(updateBlog({ blog: updatedBlog }));
        alert("Blog updated successfully!");
        this.router.navigate(['/home']).then(r => console.log(r));

      } else {
        alert("No changes detected. Nothing to update.");
        this.router.navigate(['/home']).then(r => console.log(r));
      }
    } else {
      this.blogForm.markAllAsTouched();
      alert("Please fill all required fields correctly.");
    }
  }

  private hasChanges(current: Partial<Blog>, original: Blog): boolean {
    return (
      current.title !== original.title ||
      current.content !== original.content ||
      current.category !== original.category ||
      current.imageUrl !== original.imageUrl
    );
  }
}
