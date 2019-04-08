import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  public userInfo(): Observable<any> {
    return this.http.get('/users/me').pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }

  public updateUserInfo(email: string, username: string, bio: string ) {
    const body = { email: email, username: username, bio: bio };
    return this.http.put('/users/me', body).pipe(
      map(response => console.log(response)),
      catchError(err => throwError(err)));
  }

  public getUserPosts(page): Observable<any> {
    return this.http.get(`/posts/me?page=${page}`).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }
}
