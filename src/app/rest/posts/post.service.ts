import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  public sendPost(description: string, imagePost: File): Observable<any> {
    const formData = new FormData();
    formData.set('body', description);
    formData.append('image_attributes[file_data]', imagePost, imagePost.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post('/posts', formData, { headers }).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }

  public getPostById(postId: number) {
    return this.http.get(`/posts/${postId}`).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }

  public updatePost(postId: number, description: string) {
    const formData = new FormData();
    formData.set('body', description);
    return this.http.put(`/posts/${postId}`, formData).pipe(
      map(response => console.log(response)),
      catchError(err => throwError(err)));
  }

  public deletePost(postId: number) {
    return this.http.delete(`/posts/${postId}`).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }
}
