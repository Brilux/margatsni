import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const getToken = JSON.parse(localStorage.getItem('token'));
      const tokenReq = req.clone({
        url: `${environment.api}${req.url}`,
        setHeaders: {
          Authorization: getToken ? getToken.token : ''
        }
      });
      return next.handle(tokenReq);

  }
}
