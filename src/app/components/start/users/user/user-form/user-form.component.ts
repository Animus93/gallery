import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, signal, ViewChild, ViewChildren} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogContent} from '@angular/material/dialog';
import {User} from '../../../../../interfaces/user.interface';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UsersService} from '../../users.service';
import {AuthService} from '../../../../auth/auth.service';
import {Subject, takeUntil} from 'rxjs';
import {MatIcon} from '@angular/material/icon';
import {DialogRef} from '@angular/cdk/dialog';
import {DataBase} from '../../../../../enums/database.enum';

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
    imgPath: new FormControl<string>(''),
    login: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.minLength(3)])
  })
  public imageSrc = signal<string>('');

  constructor(private dialogRef: DialogRef, @Inject(MAT_DIALOG_DATA) public user: User,
    private usersService: UsersService,
    private authService: AuthService,) {
  }

  ngAfterViewInit() {
    this.checkScroll();
    this.content.nativeElement.addEventListener('scroll', this.checkScroll.bind(this));
  }

  ngOnInit() {
    const filter = {
      scope: 'login'
    }
    if (this.usersService.user()) {
      this.updateForm(this.usersService.user())

    }
    this.usersService.getUser(this.authService.userId(), filter).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: user => {
        this.usersService.user.set(user);
        this.updateForm(this.usersService.user())
      },
      error: err => this.authService.alert(err)
    })
  }

  updateForm(user: User) {
    this.userForm.patchValue({
      firstName: user?.firstName,
      lastName: user?.lastName,
      imgPath: user?.imgPath,
      login: user?.login,
    })
  }

  upload(inputFile: any): void {
    const avatar = inputFile.target.files[0];
    if (avatar) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc.set(e.target.result);
      };
      reader.readAsDataURL(avatar);
      this.userForm.patchValue({
        imgPath: avatar
      })

      this.userForm.get('imgPath').markAsDirty()
    }
  }

  onSubmit(): void {
    const prepareData = {
      ...this.usersService.user(),
      ...this.userForm.getRawValue(),
    };
    if (!prepareData.password) {
      delete prepareData.password
    }
    this.usersService.updateUser(prepareData).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: user => {
        delete user?.login
        delete user?.password
        this.usersService.user.set(user)
        this.dialogRef.close()
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

  protected readonly DataBase = DataBase;
}
