import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Subject, takeUntil} from 'rxjs';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UsersService} from '../../start/users/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<any>();
  public loginForm = new FormGroup({
    login: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  })

  constructor(public authService: AuthService,
    private usersService: UsersService,
    private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.loginForm.value).pipe(takeUntil(this._unsubscribe)).subscribe({
      next: () => {
        this.router.navigate(['/start'])
      },
      error: error => this.authService.alert(error)
    })
  }

  ngOnDestroy() {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }

}
