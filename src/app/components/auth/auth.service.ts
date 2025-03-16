import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DataBase} from '../../enums/database.enum';
import {User} from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = DataBase.url;
  public user = signal<User | null>(null)
  alertTimer: any = null

  constructor(private http: HttpClient, private bar: MatSnackBar) {
  }

  login(user: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, user)
  }

  singUp(user: any) {
    return this.http.post(`${this.baseUrl}/auth/singUp`, user)
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  alert(error: any = 'test', action: any = null): void {
    this.bar.open(error.error.message || error.message | error, action)
    if (this.alertTimer) {
      clearTimeout(this.alertTimer)
    }
    this.alertTimer = setTimeout(() => {
      this.bar.dismiss()
    }, 2000)
  }
}
