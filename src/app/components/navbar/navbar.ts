import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  toaster = inject(ToastrService);
  authService = inject(AuthService);
  router = inject(Router);
  protected readonly localStorage = localStorage;

  goToProfile() {
    this.router.navigate(['/profile']).then(r => console.log(r));
  }

  goToCreateBlog() {
    this.router.navigate(['/create-blog']).then(r => console.log(r));
  }

  logOut() {
    this.authService.logout();
    this.toaster.error("Logged out successfully", "Logout");
    this.router.navigate(['/']).then(r => console.log(r));
  }
}
