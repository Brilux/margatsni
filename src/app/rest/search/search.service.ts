import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  public getUserPosts(user, page): Observable<any> {
    return this.http.get(`/posts/user/${user}?page=${page}`).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }
}
