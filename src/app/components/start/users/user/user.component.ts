import {Component, input, InputSignal, OnInit, signal} from '@angular/core';
import {User} from '../../../../interfaces/user.interface';
import {MatIcon} from '@angular/material/icon';
import {AppService} from '../../../../app.service';

@Component({
  selector: 'app-user',
  imports: [
    MatIcon
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  bgColor = signal('#000')
  user: InputSignal<User | null> = input<User | null>(null)
  formattedDate: string = ''

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.bgColor.set(this.appService.getRandomHexColor())
    this.dateToRelative(this.user()!.lastOnlineAt)
  }

  dateToRelative(dateString: string | Date) {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    // console.log('date', date)
    if (!date) return
    const day = String(date.getDate()).padStart(2, '0'); // День
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяц (начинается с 0)
    const year = date.getFullYear(); // Год
    const hours = String(date.getHours()).padStart(2, '0'); // Часы
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Минуты

    this.formattedDate = `${day}.${month}.${year} в ${hours}:${minutes}`;
  }
}
