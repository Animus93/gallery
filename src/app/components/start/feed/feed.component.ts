import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import {AppService} from '../../../app.service';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {PostFormComponent} from './post/post-form/post-form.component';

@Component({
  selector: 'app-feed',
  imports: [
    MatButton,
    MatIcon
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent implements OnInit {
  public randomNumber = signal<number>(1)

  constructor(public appService: AppService,
    private dialog: MatDialog,) {
  }

  ngOnInit() {
   this.randomNumber.set(this.appService.getRandomNumber(4, 1))
  }

  createPost(): void {
    this.dialog.open(PostFormComponent, {
      maxWidth: '800px',
      width: '100%',
    })
  }
}
