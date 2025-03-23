import {Injectable} from '@angular/core';
import {DataBase} from '../../../../enums/database.enum';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../../../../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl: string = DataBase.url;

  constructor(private http: HttpClient) {
  }

  getPosts(filter: any = {}): Observable<Post[]> {
    const params = {}
    if (Object.keys(filter).length > 0) {
      for (const key in filter) {
        if (filter[key]) {
          params[key] = filter[key];
        }
      }
    }
    return this.http.get<Post[]>(`${this.baseUrl}/post/all`, {params})
  }

  getPost(id: number, filter: any = {}): Observable<Post> {
    const params = {}
    if (Object.keys(filter).length > 0) {
      for (const key in filter) {
        if (filter[key]) {
          params[key] = filter[key];
        }
      }
    }
    return this.http.get<Post>(`${this.baseUrl}/post/${id}`, {params})
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.baseUrl}/post/${id}`)
  }

  createPost(post: Post): Observable<Post> {
    const img = post.imgPath;
    const formData = new FormData();
    formData.append('data', JSON.stringify(post));
    formData.append('file', img);
    return this.http.post<Post>(`${this.baseUrl}/post`, formData)
  }

  updatePost(post: Post): Observable<Post> {
    const img = post.imgPath;
    const formData = new FormData();
    formData.append('data', JSON.stringify(post));
    formData.append('file', img);
    return this.http.patch<Post>(`${this.baseUrl}/post/${post.id}`, formData)
  }

}
