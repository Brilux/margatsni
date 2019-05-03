import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StatusModel } from '../../models/status.model';
import { PostModel } from '../../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  public putLike(likeResource: string, postId: number): Observable<PostModel>  {
    const body = null;
    return this.http.post<PostModel>(`/${likeResource}/${postId}/likes`, body).pipe(
      map(response => new PostModel(response)),
      catchError(err => throwError(err)));
  }

  public removeLike(likeResource: string, postId: number): Observable<StatusModel>  {
    return this.http.delete<StatusModel>(`/${likeResource}/${postId}/likes`).pipe(
      map(response => new StatusModel(response)),
      catchError(err => throwError(err)));
  }
}
