import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  public getUsersForSearchByUsername(username): Observable<any> {
    return this.http.get(`/users/?username_query=${username}`).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }
}
