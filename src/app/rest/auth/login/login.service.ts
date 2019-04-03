import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../token.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public sendAuthorization(email: string, password: string): Observable<TokenModel> {
    const body = { email: email, password: password };
    return this.http.post<TokenModel>('/users/login', body).pipe(
      map(response => new TokenModel(response)),
      catchError(err => throwError(err)));
  }
}
