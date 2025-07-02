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
import {ToastrService} from 'ngx-toastr';

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
  toaster = inject(ToastrService);

  submissionError: string | null = null;
  signupForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    dateOfBirth: ['', [Validators.required]],
  },{ validators: matchPasswordValidator });

  successMessage: any;
  todayDate: string | undefined;
  showPassword:boolean = false;
  showConfirmPassword:boolean = false;

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
        this.toaster.info("User has been created successfully", "Success");
        this.router.navigate(['/']).then(r => console.log(r));
      }),
      catchError(err=>{
        console.error('Signup error:', err);
        this.submissionError = err.message || 'Signup failed. Please try again.';
        return EMPTY;
      })
    ).subscribe()
  }
}

function matchPasswordValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  return password && confirmPassword && password !== confirmPassword
    ? { passwordMismatch: true }
    : null;
}
