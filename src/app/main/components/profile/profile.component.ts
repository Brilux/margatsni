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
  spinner = true;
  public posts: object[] = [];
  startPage = 1;

  constructor(private profileService: ProfileService,
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
