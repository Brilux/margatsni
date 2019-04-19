import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  public userInfo(): Observable<any> {
    return this.http.get('/users/me').pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }

  public updateUserProfileInfo(username: string, email: string, password: string, bio: string, userAvatar: File | string): Observable<any> {
    const formData = new FormData();
    formData.set('username', username );
    formData.set('email', email);
    if (password !== null) {
      formData.set('password', password);
    }
    formData.set('bio', bio );
    if (typeof userAvatar !== 'string') {
      formData.append('image_attributes[file_data]', userAvatar, userAvatar.name);
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.put('/users/me', formData, { headers }).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }

  public getUserProfilePosts(page): Observable<any> {
    return this.http.get(`/posts/me?page=${page}`).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }
}
