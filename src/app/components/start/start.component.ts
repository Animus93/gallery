import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {UserFormComponent} from './users/user/user-form/user-form.component';

@Component({
  selector: 'app-start',
  imports: [
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class StartComponent {
  constructor(public loginService: AuthService,
    private dialog: MatDialog) {
  }

  userProfile(): void {
    this.dialog.open(UserFormComponent,{
      maxWidth: '800px',
      width: '100%',
    })
  }
}
