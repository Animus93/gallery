import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../components/auth/auth.service';
import {UsersService} from '../components/start/users/users.service';
import {catchError, map, of} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const usersService = inject(UsersService);
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/auth']);
    return false;
  }

  const data = authService.decodeToken(token);
  if (!data?.id) {
    router.navigate(['/auth']);
    return false;
  }
  authService.userId.set(data.id);

  if (!usersService.user()) {
    return usersService.getUser(authService.userId()).pipe(
      map((user: any) => {
        usersService.user.set(user);
        return true;
      }),
      catchError((err: any) => {
        authService.alert(err);
        router.navigate(['/auth']);
        return of(false);
      })
    );
  }
  else {
    return true
  }
}
