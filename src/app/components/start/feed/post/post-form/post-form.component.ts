import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild, ViewChildren} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatDialogContent} from '@angular/material/dialog';

@Component({
  selector: 'app-post-form',
  imports: [
    MatIcon,
    MatButton,
    MatDialogContent
  ],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostFormComponent implements AfterViewInit {
  @ViewChildren('block') block!: ElementRef[];
  @ViewChild('content') content!: ElementRef;

  ngAfterViewInit() {
    this.checkScroll();
    this.content.nativeElement.addEventListener('scroll', this.checkScroll.bind(this));
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
}
