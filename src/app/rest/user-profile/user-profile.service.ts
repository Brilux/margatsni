import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserModel } from '../auth/user.model';
import { PostsModel } from '../../models/posts.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  public userInfo(): Observable<UserModel> {
    return this.http.get<UserModel>('/users/me').pipe(
      map(response => new UserModel(response)),
      catchError(err => throwError(err)));
  }

  // tslint:disable-next-line:max-line-length
  public updateUserProfileInfo(email: string, password: string, bio: string, userAvatar: File | string): Observable<UserModel> {
    const formData = new FormData();
    formData.set('email', email);
    if (password !== null) {
      formData.set('password', password);
    }
    formData.set('bio', bio);
    if (typeof userAvatar !== 'string') {
      formData.append('image_attributes[file_data]', userAvatar, userAvatar.name);
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.put<UserModel>('/users/me', formData, { headers }).pipe(
      map(response => new UserModel(response)),
      catchError(err => throwError(err)));
  }

  public getUserProfilePosts(page): Observable<PostsModel> {
    return this.http.get<PostsModel>(`/posts/me?page=${page}`).pipe(
      map(response => new PostsModel(response)),
      catchError(err => throwError(err)));
  }
}
