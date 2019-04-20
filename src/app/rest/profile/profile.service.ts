import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  public getUserProfileByUsername(username) {
    return this.http.get(`/users/${username}`).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }

  public getUserPostsByUsername(username, page): Observable<any> {
    return this.http.get(`/posts/user/${username}?page=${page}`).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }

  public sendSubscribe(userId): Observable<any> {
    const body = null;
    return this.http.post(`/users/${userId}/following`, body).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }

  public sendUnSubscribe(userId): Observable<any> {
    return this.http.delete(`/users/${userId}/following`).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }

  public getFollowers(userId): Observable<any> {
    return this.http.get(`/users/${userId}/followers`).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }

  public getFollowing(userId): Observable<any> {
    return this.http.get(`/users/${userId}/following`).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }
}
