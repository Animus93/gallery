import {Routes} from '@angular/router';
import {authGuard} from '../../guards/auth.guard';
import {StartComponent} from './start.component';
import {FeedComponent} from './feed/feed.component';
import {UsersComponent} from './users/users.component';

export const START_ROUTES: Routes = [
  {
    path: '',
    component: StartComponent,
    canActivate: [authGuard],
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'feed'},
      {
        path: 'feed',
        component: FeedComponent,
        canActivate: [authGuard],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [authGuard],
      },
      {path: '**', pathMatch: 'full', redirectTo: 'feed'},
    ]
  },
]
