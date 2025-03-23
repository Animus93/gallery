import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal} from '@angular/core';
import {AppService} from '../../../app.service';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {PostFormComponent} from './post/post-form/post-form.component';
import {PostService} from './post/post.service';
import {Subject, takeUntil} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {Post} from '../../../interfaces/post.interface';
import {PostComponent} from './post/post.component';
import {UsersService} from '../users/users.service';

@Component({
  selector: 'app-feed',
  imports: [
    MatButton,
    MatIcon,
    PostComponent
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<any> = new Subject<any>();
  public randomNumber = signal<number>(1)
  public posts = signal<Post[]>([])

  constructor(public appService: AppService,
    private dialog: MatDialog,
    private postService: PostService,
    private authService: AuthService,
    private usersService: UsersService,) {
  }

  ngOnInit() {
    this.postService.getPosts().pipe(takeUntil(this.unsubscribe)).subscribe({
      next: posts => {
        this.posts.set(posts)
        if (!posts.length) {
          this.randomNumber.set(this.appService.getRandomNumber(4, 1))
        }
      },
      error: error => this.authService.alert(error)
    })
  }

  handleEvent(event: any) {
    switch (event.action) {
      case 'deletePost': {
        this.posts.update(posts => posts.filter((post) => post.id !== event.data.post.id))
        break;
      }
      case 'updatePost': {
        this.posts.update(posts => {
          const upd =posts.map((post) => {
            if (post.id == event.data.post.id) {
              post = event.data.post
            }
            return post
          })
          return upd
        })
        break;
      }
    }
  }

  createPost(): void {
    this.dialog.open(PostFormComponent, {
      maxWidth: '800px',
      width: '100%',
    }).afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(post => {
      if (!post) {
        return
      }
      this.postService.createPost(post).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: data => {
          if (data) {
            console.log(data)
            this.posts.update(posts => {
              posts.unshift({
                ...data,
                author: this.usersService.user(),
              })
              console.log('posts',posts)
              return [...posts]
            })
            console.log('test',this.posts())
          }
        },
        error: error => this.authService.alert(error)
      })
    })
  }

  ngOnDestroy() {
    this.unsubscribe.next(null)
    this.unsubscribe.complete()
  }
}
