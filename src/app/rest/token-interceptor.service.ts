import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const getToken = JSON.parse(localStorage.getItem('token'));
    if (getToken) {
      const tokenReq = req.clone({
        setHeaders: {
          Authorization: getToken.token
        }
      });
      return next.handle(tokenReq);
    } else {
      return next.handle(req);
    }
  }
}
