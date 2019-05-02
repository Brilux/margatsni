import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CommentsModel } from '../../models/comments.model';
import { StatusModel } from '../../models/status.model';
import { CommentModel } from '../../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  public getCommentById(postId: number, page: number): Observable<CommentsModel> {
    return this.http.get<CommentsModel>(`/posts/${postId}/comments?page=${page}`).pipe(
      map(response => new CommentsModel(response)),
      catchError(err => throwError(err)));
  }

  public deleteCommentById(postId: number, commentId: number): Observable<StatusModel> {
    return this.http.delete<StatusModel>(`/posts/${postId}/comments/${commentId}`).pipe(
      map(response => new StatusModel(response)),
      catchError(err => throwError(err)));
  }

  public editCommentById(comment: string, postId: number, commentId: number): Observable<CommentModel> {
    const body = { body: comment };
    return this.http.put<CommentModel>(`/posts/${postId}/comments/${commentId}`, body).pipe(
      map(response => new CommentModel(response.comment)),
      catchError(err => throwError(err)));
  }
}
