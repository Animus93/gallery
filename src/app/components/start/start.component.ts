import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {UserFormComponent} from './users/user/user-form/user-form.component';
import {UsersService} from './users/users.service';
import {MatDivider} from '@angular/material/divider';
import {DataBase} from '../../enums/database.enum';

@Component({
  selector: 'app-start',
  imports: [
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatDivider
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class StartComponent {
  constructor(public usersService: UsersService,
    public authService: AuthService,
    private dialog: MatDialog) {
  }

  userProfile(): void {
    this.dialog.open(UserFormComponent,{
      maxWidth: '800px',
      width: '100%',
    })
  }

  protected readonly DataBase = DataBase;
}
