import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  authService = inject(AuthService);
  router = inject(Router);

  goToProfile(){
    this.router.navigate(['/profile']).then(r => console.log(r));
  }

  goToCreateBlog(){
    this.router.navigate(['/create-blog']).then(r => console.log(r));
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/']).then(r => console.log(r));
  }
}
