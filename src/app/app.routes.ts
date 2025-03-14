import {Routes} from '@angular/router';
import {StartComponent} from './components/start/start.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegistrationComponent} from './components/auth/registration/registration.component';
import {AuthComponent} from './components/auth/auth.component';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'start'},
  {
    path: 'start',
    component: StartComponent,
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
];
