import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { TokenModel } from '../token.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_LOGIN_URL;
  }

  public sendAuthorization(email: string, password: string): Observable<TokenModel> {
    const body = { email: email, password: password };
    return this.http.post<TokenModel>(this.url, body).pipe(
      map(response => response),
      catchError(err => throwError(err)));
  }
}
