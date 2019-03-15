import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_FEED_URL;
  }

  public posts(): Observable<any> {
    return this.http.get(this.url).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }
}
