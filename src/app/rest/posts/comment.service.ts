import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  public getCommentById(postId: number, page: number): Observable<any> {
    return this.http.get(`/posts/${postId}/comments?page=${page}`).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }

  public deleteCommentById(postId: number, commentId: number): Observable<any> {
    return this.http.delete(`/posts/${postId}/comments/${commentId}`).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }
}
