import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  profileForm!: FormGroup;
  isEditMode = false;
  currentUser: any;

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      dateOfBirth: [{value: '', disabled: true }, Validators.required],
      password: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(8)]]
    });

    const userData = localStorage.getItem('user');
    if(userData) {
      this.currentUser = JSON.parse(userData);
      this.profileForm.patchValue({
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        email: this.currentUser.email,
        dateOfBirth: this.currentUser.dateOfBirth,
        password: this.currentUser.password
      });
    }
  }

  enableEdit(){
    this.isEditMode = true;
    this.profileForm.enable();
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.value;

      const updatedUser = {
        ...this.currentUser,
        ...updatedData
      }
      localStorage.setItem('user', JSON.stringify(updatedData));
      console.log(updatedUser)
      this.authService.updateUser(updatedUser).subscribe({
        next: (response)=>{
          alert('Profile updated successfully!');
          this.isEditMode = false;
          this.profileForm.disable();
          this.router.navigate(['/home']).then(r => console.log(r));
        },
        error: (error) => {
          alert('Error updating profile: ' + error.message);
        }
      })
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

}
