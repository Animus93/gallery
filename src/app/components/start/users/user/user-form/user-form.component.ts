import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogContent} from '@angular/material/dialog';
import {User} from '../../../../../interfaces/user.interface';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UsersService} from '../../users.service';
import {AuthService} from '../../../../auth/auth.service';
import {Subject, takeUntil} from 'rxjs';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-user-form',
  imports: [
    MatButton,
    MatDialogContent,
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements AfterViewInit, OnInit, OnDestroy {
  private unsubscribe: Subject<any> = new Subject<any>();
  @ViewChildren('block') block!: ElementRef[];
  @ViewChild('content') content!: ElementRef;
  userForm = new FormGroup({
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>(''),
    avatar: new FormControl<File | null>(null),
    login: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.minLength(3)])
  })
  public fullUser?: User
  public imageSrc: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public user: User,
    private usersService: UsersService,
    private authService: AuthService,) {
  }

  ngAfterViewInit() {
    this.checkScroll();
    this.content.nativeElement.addEventListener('scroll', this.checkScroll.bind(this));
  }

  ngOnInit() {
    this.usersService.getUserById(this.authService.user()?.id).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: user => {
        this.fullUser = user;
        this.userForm.patchValue({
          firstName: user?.firstName,
          lastName: user?.lastName,
          avatar: user?.avatar,
          login: user?.login,
        })
      },
      error: err => this.authService.alert(err)
    })
  }

  upload(inputFile: any): void {
    const avatar = inputFile.target.files[0];
    if (avatar) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log('e.target.result',e.target.result)
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(avatar);
      this.userForm.patchValue({
        avatar: avatar
      })

      this.userForm.get('avatar').markAsDirty()
    }
  }

  onSubmit(): void {
    const prepareData = {
      ...this.fullUser,
      ...this.userForm.getRawValue(),
    };
    if (!prepareData.password) {
      // @ts-ignore
      delete prepareData.password
    }
    this.usersService.updateUser(prepareData).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: user => {
        delete user.login
        delete user.password
        this.authService.user.set(user)
      },
      error: err => this.authService.alert(err)
    })
  }

  checkScroll() {
    if (this.content.nativeElement.scrollTop) {
      this.block.forEach(el => {
        el.nativeElement.classList.add('shadow');
      })
    }
    else {
      this.block.forEach(el => {
        el.nativeElement.classList.remove('shadow');
      })
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next(null)
    this.unsubscribe.complete()
  }
}
