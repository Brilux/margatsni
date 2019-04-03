import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) {
  }

  public posts(): Observable<any> {
    return this.http.get('/posts').pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }
}
