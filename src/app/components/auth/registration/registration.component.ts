import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {Subject, takeUntil} from 'rxjs';
import {AuthService} from '../auth.service';
import {UsersService} from '../../start/users/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [
    FormsModule,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<any>();
  public registrationForm = new FormGroup({
    login: new FormControl<string>('', [Validators.required]),
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>(''),
    password: new FormControl<string>('', [Validators.required]),
  })

  constructor(public authService: AuthService,
    private usersService: UsersService,
    private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    this.authService.singUp(this.registrationForm.value).pipe(takeUntil(this._unsubscribe)).subscribe({
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
