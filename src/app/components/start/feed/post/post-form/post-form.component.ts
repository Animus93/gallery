import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, signal, ViewChild, ViewChildren} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Post} from '../../../../../interfaces/post.interface';
import {AuthService} from '../../../../auth/auth.service';
import {Subject} from 'rxjs';
import {UsersService} from '../../../users/users.service';
import {DataBase} from '../../../../../enums/database.enum';

@Component({
  selector: 'app-post-form',
  imports: [
    MatIcon,
    MatButton,
    MatDialogContent,
    ReactiveFormsModule
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostFormComponent implements AfterViewInit, OnInit, OnDestroy {
  private unsubscribe = new Subject<any>();
  @ViewChildren('block') block!: ElementRef[];
  @ViewChild('content') content!: ElementRef;
  public postForm = new FormGroup({
    imgPath: new FormControl<string>(''),
    text: new FormControl<string>(''),
  })
  public imageSrc = signal<string>('');

  constructor(private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private dialogRef: MatDialogRef<PostFormComponent>,) {
  }

  get isSomeField() {
    return this.postForm.get('imgPath').value || this.postForm.get('text').value
  }

  ngAfterViewInit() {
    this.checkScroll();
    this.content.nativeElement.addEventListener('scroll', this.checkScroll.bind(this));
  }

  ngOnInit() {
    if (this.data) {
      this.postForm.setValue({
        imgPath: this.data.imgPath,
        text: this.data.text,
      })
    }
    this.postForm.markAsPristine()
  }

  upload(inputFile: any): void {
    const img = inputFile.target.files[0];
    if (!img.type.includes('image')) {
      return
    }
    if (img) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc.set(e.target.result);
      };
      reader.readAsDataURL(img);
      this.postForm.patchValue({
        imgPath: img
      })

      this.postForm.get('imgPath').markAsDirty()
    }
  }

  onSubmit(): void {
    const prepareData: Post = {
      ...this.data,
      ...this.postForm.getRawValue(),
      authorId: this.authService.userId()
    }
    this.dialogRef.close(prepareData);
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
