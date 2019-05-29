import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://127.0.0.1:8080/posts';

  constructor(private http: HttpClient) {  }

  sendPost(post: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/create`, post);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}` + `/list`)
  }
}
