import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  router = inject(Router);

  goToProfile(){
    this.router.navigate(['/profile']);
  }

  goToCreateBlog(){
    this.router.navigate(['/create-blog']);
  }
}
