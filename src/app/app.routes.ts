import {Routes} from '@angular/router';
import {StartComponent} from './components/start/start.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegistrationComponent} from './components/auth/registration/registration.component';
import {AuthComponent} from './components/auth/auth.component';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'start'},
  {
    path: 'start',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./components/start/start.routes').then(
        (mod) => mod.START_ROUTES
      ),
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
    ]
  },
  {path: '**', pathMatch: 'full', redirectTo: 'start'},
];
