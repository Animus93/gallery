import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal} from '@angular/core';
import {UsersService} from './users.service';
import {Subject, takeUntil} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../../interfaces/user.interface';
import {UserComponent} from './user/user.component';

@Component({
  selector: 'app-users',
  imports: [
    UserComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {
  private _unsubscribe: Subject<any> = new Subject<any>();
  users = signal<User[]>([])

  constructor(private usersService: UsersService,
    private authService: AuthService,) {
  }

  ngOnInit() {
    this.usersService.getUsers().pipe(takeUntil(this._unsubscribe)).subscribe({
      next: users => {
        this.users.set(users);
      },
      error: error => this.authService.alert(error),
    })
  }

  ngOnDestroy() {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
