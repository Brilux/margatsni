import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { TokenModel } from '../token.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_REGISTRATION_URL;
  }

  public sendRegistration(username: string, email: string, password: string): Observable<TokenModel> {
    const body = { username: username, email: email, password: password };
    return this.http.post<TokenModel>(this.url, body).pipe(
      map(response => new TokenModel(response)),
      catchError(err => throwError(err)));
  }
}

