import {Component, EventEmitter, input, OnDestroy, OnInit, Output} from '@angular/core';
import {Post} from '../../../../interfaces/post.interface';
import {DataBase} from '../../../../enums/database.enum';
import {AppService} from '../../../../app.service';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {AuthService} from '../../../auth/auth.service';
import {Subject, switchMap, takeUntil, tap} from 'rxjs';
import {PostService} from './post.service';
import {PostFormComponent} from './post-form/post-form.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-post',
  imports: [
    MatIconButton,
    MatIcon
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit, OnDestroy {
  private unsubscribe = new Subject<any>();

  public post = input<Post>();
  @Output() eventEmitter = new EventEmitter<any>();
  protected readonly DataBase = DataBase;
  public bg: string = '#f09'
  public userId: number;

  constructor(private appService: AppService,
    private authService: AuthService,
    private dialog: MatDialog,
    private postService: PostService,) {
    this.bg = this.appService.getDarkColor()
  }

  ngOnInit() {
    this.userId = this.authService.userId()
  }

  onEditPost(): void {
    this.dialog.open(PostFormComponent, {
      maxWidth: '800px',
      width: '100%',
      data: this.post(),
    }).afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(post => {
      if (!post) {
        return
      }
      this.postService.updatePost(post).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: data => {
          if (data) {
            this.eventEmitter.next({
              action: 'updatePost',
              data: {post: data}
            });
          }
        },
        error: error => this.authService.alert(error)
      })
    })
  }

  onDeletePost(): void {
    this.authService.alert('Удалить пост?', 'Удалить', 6000).onAction().pipe(switchMap(_action => {
      return this.postService.deletePost(this.post().id).pipe(tap(() => {
        this.eventEmitter.next({
          action: 'deletePost',
          data: {post: this.post()}
        })
      }))
    }), takeUntil(this.unsubscribe)).subscribe({
      next: data => {
      },
      error: error => this.authService.alert(error)
    })
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }
}
