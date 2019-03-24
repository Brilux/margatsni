import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_CREATE_POST;
  }

  public sendPost(description: string, imagePost: File): Observable<any> {
    const formData = new FormData();
    formData.set('body', description);
    formData.append('image_attributes[file_data]', imagePost, imagePost.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post(this.url, formData, { headers }).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }
}
