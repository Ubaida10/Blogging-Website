import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { catchError, EMPTY, tap } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);

  submissionError: string | null = null;
  signupForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    dateOfBirth: ['', [Validators.required]],
  },{ validators: this.matchPasswordValidator });

  successMessage: any;
  todayDate: string | undefined;
  showPassword:boolean = false;
  showConfirmPassword:boolean = false;



  matchPasswordValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }


  onSubmit(){
    this.submissionError = null;

    if(this.signupForm.invalid){
      this.submissionError = 'Please fill in all required fields correctly.';
      this.signupForm.markAllAsTouched();
      return;
    }

    const user = this.signupForm.value;
    this.authService.signup(user).pipe(
      tap(()=>{
        console.log('Account created successfully.');
        this.router.navigate(['/']);
      }),
      catchError(err=>{
        console.error('Signup error:', err);
        this.submissionError = err.message || 'Signup failed. Please try again.';
        return EMPTY;
      })
    ).subscribe()
  }
}
