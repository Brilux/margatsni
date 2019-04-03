import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../rest/profile/profile.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userInfo = {};

  constructor(private profileService: ProfileService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.profileService.userInfo().subscribe(info => this.userInfo = info.user);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
