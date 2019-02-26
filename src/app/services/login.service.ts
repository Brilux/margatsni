import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_LOGIN_URL;
  }

  public sendRegistration(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };
    return this.http.post(this.url, body).pipe(
      map(response => response),
      catchError(err => {
        console.error(err.error);
        return throwError(err);
      }));
  }
}
