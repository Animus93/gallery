import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './components/auth/auth.service';
import {Subject, takeUntil} from 'rxjs';
import {Router, RouterOutlet} from '@angular/router';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    JsonPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<any>();
  title = 'gallery';

  constructor(public loginService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.loginService.getUser().pipe(takeUntil(this._unsubscribe)).subscribe({
      next: (result) => {
        (this.loginService.user.set(result.user))
      },
      error: (error) => {
        console.log('this.router.url',this.router.url)
        if (!this.loginService.user() && !this.router.url.includes('auth')) {
          this.router.navigate(['auth']);
        }
      },
    })
  }

  // getCats() {
  //   this.loginService.getCats().pipe(takeUntil(this._unsubscribe)).subscribe({
  //     next: result => {
  //     },
  //     error: error => this.loginService.alert(error)
  //   })
  // }

  ngOnDestroy() {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
