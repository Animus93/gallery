import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DataBase} from '../../enums/database.enum';
import {map, Observable} from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = DataBase.url;
  public userId = signal<number>(null)
  alertTimer: any = null

  constructor(private http: HttpClient, private bar: MatSnackBar) {
  }

  login(user: any): Observable<void> {
    return this.http.post(`${this.baseUrl}/auth/login`, user).pipe(map((data: any) => {
      localStorage.setItem('token', data.access_token);
      return null
    }))
  }

  singUp(user: any): Observable<void> {
    return this.http.post(`${this.baseUrl}/auth/singUp`, user).pipe(map((data: any) => {
      localStorage.setItem('token', data.access_token);
      return null
    }))
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      this.alert('Ошибка формата токена');
      return null;
    }
  }

  alert(error: any = 'test', action: any = null, time: number = 2000) {
    if (this.alertTimer) {
      clearTimeout(this.alertTimer)
    }
    this.alertTimer = setTimeout(() => {
      this.bar.dismiss()
    }, time)
    return this.bar.open(error?.error?.message ?? error?.message ?? error, action)
  }
}
