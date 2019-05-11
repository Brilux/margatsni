import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PostModel } from '../../models/post.model';
import { CommentModel } from '../../models/comment.model';
import { StatusModel } from '../../models/status.model';
import { PostsModel } from '../../models/posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  public sendPost(description: string, imagePost: File): Observable<PostModel> {
    const formData = new FormData();
    formData.set('body', description);
    formData.append('image_attributes[file_data]', imagePost, imagePost.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post<PostModel>('/posts', formData, { headers }).pipe(
      map(response => new PostModel(response)),
      catchError(err => throwError(err)));
  }

  public getPostById(postId: number): Observable<PostModel> {
    return this.http.get<PostModel>(`/posts/${postId}`).pipe(
      map(response => new PostModel(response.post)),
      catchError(err => throwError(err)));
  }

  public getPosts(page: number): Observable<PostsModel> {
    return this.http.get<PostsModel>(`/posts?page=${page}`).pipe(
      map(response => new PostsModel(response)),
      catchError(err => throwError(err)));
  }

  public updatePost(postId: number, description: string): Observable<PostModel> {
    const formData = new FormData();
    formData.set('body', description);
    return this.http.put<PostModel>(`/posts/${postId}`, formData).pipe(
      map(response => new PostModel(response)),
      catchError(err => throwError(err)));
  }

  public deletePost(postId: number): Observable<StatusModel> {
    return this.http.delete<StatusModel>(`/posts/${postId}`).pipe(
      map(response => new StatusModel(response)),
      catchError(err => throwError(err)));
  }

  public sendComment(postId: number, comment: string): Observable<CommentModel> {
    const body = { body: comment };
    return this.http.post<CommentModel>(`/posts/${postId}/comments`, body).pipe(
      map(response => new CommentModel(response.comment)),
      catchError(err => throwError(err)));
  }
}
