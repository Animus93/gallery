import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DataBase} from '../../../enums/database.enum';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = DataBase.url;

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<{ user: User }> {
    return this.http.get<{ user: User }>(`${this.baseUrl}/user/profile`)
  }

  getUserById(id?: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${id}`, {params: {scope: 'login'}})
  }

  updateUser(user: any): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/user/${user.id}`, user)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user`)
  }
}
