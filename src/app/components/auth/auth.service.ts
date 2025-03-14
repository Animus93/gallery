import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'http://localhost:3000';
  public user = signal<any>(null)
  alertTimer: any = null

  constructor(private http: HttpClient, private bar: MatSnackBar) {
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/profile`)
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
