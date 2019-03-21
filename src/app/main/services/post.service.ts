import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  public sendPost(description: string): Observable<any> {
    const body = { body: description };
    return this.http.post(this.url, body).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }
}
