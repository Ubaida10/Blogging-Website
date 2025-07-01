import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Blog } from '../../models/blog';
import { NgClass, Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { updateBlog, loadBlogs } from '../../state/blogs/blog.actions';
import { selectBlogById } from '../../state/blogs/blog.selector';
import {ToastrService} from 'ngx-toastr';

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
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  store = inject(Store);
  toaster = inject(ToastrService);


  blogForm!: FormGroup;
  blogId!: string;
  imagePreview: string | null = null;
  originalBlog!: Blog;
  categories = ['Sports', 'Cricket', 'Fashion', 'Technology', 'Health'];

  constructor(private location: Location) {}

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
      this.store.select(selectBlogById(this.blogId)).subscribe(blog => {
        if (blog) {
          this.originalBlog = { ...blog };
          this.blogForm.patchValue({
            title: blog.title || '',
            content: blog.content || '',
            category: blog.category || '',
            imageUrl: blog.imageUrl || ''
          });
          this.imagePreview = blog.imageUrl || null;
        }
        else {
          this.store.dispatch(loadBlogs());
        }
      });
    }
    else {
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
        this.toaster.success('Blog updated', 'Success');
        this.location.back();

      } else {
        alert("No changes detected. Nothing to update.");
        this.location.back();
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

  goBack() {
    this.location.back();
  }
}
