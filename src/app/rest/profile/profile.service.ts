import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UserModel } from '../auth/user.model';
import { PostsModel } from '../../models/posts.model';
import { StatusModel } from '../../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  public getUserProfileByUsername(username): Observable<UserModel> {
    return this.http.get<UserModel>(`/users/${username}`).pipe(
      map(response => new UserModel(response.user)),
      catchError(err => throwError(err)));
  }

  public getUserPostsByUsername(username, page): Observable<PostsModel> {
    return this.http.get<PostsModel>(`/posts/user/${username}?page=${page}`).pipe(
      map(response => new PostsModel(response)),
      catchError(err => throwError(err)));
  }

  public sendSubscribe(userId): Observable<StatusModel> {
    return this.http.post<StatusModel>(`/users/${userId}/following`, {}).pipe(
      map(response => new StatusModel(response)),
      catchError(err => throwError(err)));
  }

  public sendUnSubscribe(userId): Observable<StatusModel> {
    return this.http.delete<StatusModel>(`/users/${userId}/following`).pipe(
      map(response => new StatusModel(response)),
      catchError(err => throwError(err)));
  }

  public getFollowers(userId): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`/users/${userId}/followers`).pipe(
      map(response => response.map(user => new UserModel(user))),
      catchError(err => throwError(err)));
  }

  public getFollowing(userId): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`/users/${userId}/following`).pipe(
      map(response => response.map(user => new UserModel(user))),
      catchError(err => throwError(err)));
  }
}
