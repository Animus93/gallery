import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './components/auth/auth.service';
import {Subject, takeUntil} from 'rxjs';
import {Router, RouterOutlet,} from '@angular/router';
import {IconResolver, MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {UsersService} from './components/start/users/users.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<any>();
  title = 'gallery';

  constructor(public loginService: AuthService,
    private usersService: UsersService,
    private router: Router, private iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    const resolver: IconResolver = (name: string) => sanitizer
      .bypassSecurityTrustResourceUrl(`/assets/images/icons/${name}.svg`);
    iconRegistry.addSvgIconResolver(resolver)
  }

  ngOnInit() {
    this.usersService.getUser().pipe(takeUntil(this._unsubscribe)).subscribe({
      next: (result) => {
        (this.loginService.user.set(result.user))
      },
      error: (error) => {
        if (!this.loginService.user() && !this.router.url.includes('auth')) {
          this.router.navigate(['auth']);
        }
      },
    })
  }

  ngOnDestroy() {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
