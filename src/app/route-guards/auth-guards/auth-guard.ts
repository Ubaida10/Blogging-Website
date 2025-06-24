import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if(authService.isLoggedIn()){
    return true;
  }
  else{
    router.navigate(['/']).then(r => console.log(r));
    return false;
  }
};
