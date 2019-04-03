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

  username: string;
  bio: string;

  constructor(private profileService: ProfileService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.profileService.userInfo().subscribe(info => {
      this.username = info.user.username;
      this.bio = info.user.bio;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
