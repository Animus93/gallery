import {Component, effect} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  constructor(private authService: AuthService, private router: Router) {
    effect(() => {
      if (this.authService.user()) {
        this.router.navigate(['start']);
      }
    });
  }

}
