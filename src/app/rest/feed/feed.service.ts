import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PostsModel } from '../../models/posts.model';
import { PostModel } from '../../models/post.model';


@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) {
  }

  public getPosts(page: number): Observable<PostsModel> {
    return this.http.get<PostsModel>(`/posts?page=${page}`).pipe(
      map(response => new PostsModel(response)),
      catchError(err => throwError(err)));
  }

  public getPostsById(postId: number): Observable<PostModel> {
    return this.http.get<PostModel>(`/posts/${postId}`).pipe(
      map(response => new PostModel(response.post)),
      catchError(err => throwError(err)));
  }
}
