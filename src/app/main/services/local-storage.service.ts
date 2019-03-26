import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getUserInfo() {
    return JSON.parse(localStorage.getItem('token'));
  }
}
