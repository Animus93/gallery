import {Injectable, signal} from '@angular/core';
import {Observable} from 'rxjs';
import {DataBase} from '../../../enums/database.enum';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = DataBase.url;
  public user = signal<User | null>(null)

  constructor(private http: HttpClient) {
  }

  getUser(id?: number, filter: any = {}): Observable<User> {
    const params = {}
    if (Object.keys(filter).length > 0) {
      for (const key in filter) {
        if (filter[key]) {
          params[key] = filter[key];
        }
      }
    }
    return this.http.get<User>(`${this.baseUrl}/user/${id}`, {params})
  }

  updateUser(user: any): Observable<User> {
    const avatar = user.imgPath;
    const formData = new FormData();
    formData.append('data', JSON.stringify(user));
    formData.append('file', avatar);
    return this.http.patch<User>(`${this.baseUrl}/user/${user.id}`, formData)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user/all`)
  }
}
