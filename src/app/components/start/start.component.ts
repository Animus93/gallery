import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-start',
  imports: [
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class StartComponent {
constructor(public loginService: AuthService) {
}
}
