import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public userUrl: string;

  constructor(private authService: AuthService,
              private router: Router,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    const userInfo = this.localStorageService.getUserInfo();
    this.userUrl = userInfo.user.username;
  }

}
