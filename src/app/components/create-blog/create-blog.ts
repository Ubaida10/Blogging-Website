import {Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import {Store} from '@ngrx/store';
import {createBlog} from '../../state/blogs/blog.actions';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.html',
  styleUrls: ['./create-blog.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule
  ]
})
export class CreateBlog {
  blogForm: FormGroup;
  categories = ['Sports', 'Cricket', 'Fashion', 'Technology', 'Health'];

  toaster = inject(ToastrService);
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: ['']
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.blogForm.patchValue({ imageUrl: base64 });
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.blogForm.invalid) {
      alert('Please fill all required fields');
      return;
    }
    const userData = localStorage.getItem('user');
    if (!userData) {
      alert('User not logged in');
      this.router.navigate(['/login']).then(r => console.log(r));
      return;
    }
    const user = JSON.parse(userData);
    const firstName = user.firstName;
    const lastName = user.lastName;
    const blogData = {
      id: uuidv4(),
      title: this.blogForm.value.title,
      content: this.blogForm.value.content,
      author: `${firstName} ${lastName}`,
      category: this.blogForm.value.category,
      publishDate: new Date(),
      lastUpdated: new Date(),
      imageUrl: this.blogForm.value.imageUrl || null
    };

    this.store.dispatch(createBlog({ blog: blogData }));
    this.toaster.success('Blog created successfully!', 'Success');
    this.router.navigate(['/home']).then(r => console.log(r));
  }
}
