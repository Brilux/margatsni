import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { TokenModel } from '../token.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  public sendRegistration(username: string, email: string, password: string): Observable<TokenModel> {
    const body = { username: username, email: email, password: password };
    return this.http.post<TokenModel>('/users', body).pipe(
      map(response => new TokenModel(response)),
      catchError(err => throwError(err)));
  }
}

