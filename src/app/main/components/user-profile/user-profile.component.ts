import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../rest/user-profile/user-profile.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  username: string;
  bio: string;
  spinner = true;
  public posts: object[] = [];
  startPage = 1;

  constructor(private profileService: UserProfileService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.profileService.userInfo().subscribe(info => {
      this.username = info.user.username;
      this.bio = info.user.bio;
    });
    this.profileService.getUserPosts(this.startPage).subscribe(post => {
      this.posts = post.posts;
      this.spinner = false;
    });
  }

  onScroll() {
    this.startPage++;
    this.profileService.getUserPosts(this.startPage).subscribe(post => {
      const posts = post.posts;
      posts.forEach(item => {
        this.posts.push(item);
      });
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
