import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BlogsService} from '../../services/blogs/blogs.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Blog} from '../../interfaces/blog';

@Component({
  selector: 'app-blog-update',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './blog-update.html',
  styleUrl: './blog-update.css'
})
export class BlogUpdate implements OnInit{
  blogService = inject(BlogsService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);

  blogForm!: FormGroup;
  blogId!: string;
  ngOnInit() {
    this.blogForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });

    const id:string|null = this.route.snapshot.paramMap.get('id');
    if(id){
      this.blogId = id;
      this.blogService.getBlogById(this.blogId).subscribe({
        next: result => {
          this.blogForm.patchValue(result);
        },
        error: error => {
          console.log(error);
          this.router.navigate(['/home']).then(r => console.log(r));
        }
      });
    }
    else{
      alert("Invalid Blog Id");
      this.router.navigate(['/home']).then(r => console.log(r));
    }
  }

  onSubmit(){
    if(this.blogForm.valid){
      const updateBlog:Blog = {
        id: this.blogId,
        ...this.blogForm.value,
        lastUpdated: new Date()
      };
      console.log(updateBlog);
      this.blogService.updateBlog(updateBlog).subscribe({
        next: result => {
          alert("Blog updated successfully");
          this.router.navigate(['/home']).then(r => console.log(r));
        },
        error: error => {
          alert("Failed to update blog");
        }
      });
    }
    else{
      alert("Invalid Blog Id");
      this.router.navigate(['/home']).then(r => console.log(r));
    }
  }
}
