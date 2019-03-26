import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public userUrl: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('token'));
    this.userUrl = userInfo.user.username;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
