import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_PROFILE_INFO;
  }

  public userInfo(): Observable<any> {
    return this.http.get(this.url).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }
}
