import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public LocalStorageSaveToken(response) {
    localStorage.setItem('token', JSON.stringify(response));
  }
}
