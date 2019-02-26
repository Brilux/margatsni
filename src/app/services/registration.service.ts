import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  public url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_REGISTRATION_URL;
  }

  public sendRegistration(username: string, email: string, password: string): Observable<any> {
    const body = { username: username, email: email, password: password };
    return this.http.post(this.url, body).pipe(
      map(response => response),
      catchError(err => {
        console.error(err.error);
        return throwError(err);
      }));
  }
}

