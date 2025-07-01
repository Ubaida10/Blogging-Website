import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, EMPTY, tap } from 'rxjs';
import {NgClass} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);
  toaster = inject(ToastrService);

  submissionError:string| null = null;
  showPassword:boolean = false;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  validateUser() {
    console.log("inside validate");
    this.submissionError = null;

    if (this.loginForm.invalid) {
      this.submissionError = 'Please fill in all required fields correctly.';
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).pipe(
      tap(success => {
        if (success) {
          this.toaster.success('Logged in successfully!', 'Success');
          this.router.navigate(['/home']).then(r => console.log(r));
        } else {
          this.submissionError = 'Invalid email or password.';
        }
      }),
      catchError(err => {
        console.error('Login error:', err);
        this.submissionError = err.message || 'Login failed. Please try again.';
        return EMPTY;
      })
    ).subscribe();
  }
}
