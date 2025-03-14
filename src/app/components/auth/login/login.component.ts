import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Subject, takeUntil} from 'rxjs';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

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

  constructor(public loginService: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.loginForm.value).pipe(takeUntil(this._unsubscribe)).subscribe({
      next: (data: any) => {
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
          window.location.reload();
        }
      },
      error: error => {
        this.loginService.alert(error);
      }
    })
  }

  ngOnDestroy() {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }

}
