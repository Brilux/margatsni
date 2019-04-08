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

  public posts(page): Observable<any> {
    return this.http.get(`/posts?page=${page}`).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }
}
