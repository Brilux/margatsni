import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  private authorization = false;

  login() {
    this.authorization = true;
  }

  logout() {
    this.authorization = false;
    localStorage.removeItem('token');
  }

  loggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  public LocalStorageSaveToken(response) {
    localStorage.setItem('token', JSON.stringify(response));
  }
}
