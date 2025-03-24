import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {AuthService} from './auth.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-auth',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ReactiveFormsModule,
    MatButton,
    MatIcon,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {

  constructor(public authService: AuthService, private router: Router) {
    // effect(() => {
    //   console.log('1')
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['start']);
    }
    // });
  }

}
