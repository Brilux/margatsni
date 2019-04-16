import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  public putLike(likeResource: string, postId: number): Observable<any>  {
    const body = null;
    return this.http.post(`/${likeResource}/${postId}/likes`, body).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }

  public removeLike(likeResource: string, postId: number): Observable<any>  {
    return this.http.delete(`/${likeResource}/${postId}/likes`).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }
}
