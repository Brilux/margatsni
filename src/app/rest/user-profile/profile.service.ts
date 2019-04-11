import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  public userInfo(): Observable<any> {
    return this.http.get('/users/me').pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }

  public updateUserProfileInfo(email: string, username: string, bio: string ): Observable<any> {
    const body = { email: email, username: username, bio: bio };
    return this.http.put('/users/me', body).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }

  public getUserProfilePosts(page): Observable<any> {
    return this.http.get(`/posts/me?page=${page}`).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }

  public getUserPosts(user, page): Observable<any> {
    return this.http.get(`/posts/user/${user}?page=${page}`).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }
}
