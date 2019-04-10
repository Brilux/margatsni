import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../../rest/user-profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  startPage = 1;
  public posts: object[] = [];
  errorMessage: string;
  spinner = true;

  constructor(private profileService: ProfileService,
              private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(() => {
      this.spinner = true;
      this.posts = [];
      this.errorMessage = '';
      this.getProfile();
    });
  }

  getProfile() {
    this.profileService.getUserPosts(this.router.url.slice(9), this.startPage).subscribe(post => {
      this.posts = post.posts;
      this.spinner = false;
    }, err => {
      this.errorMessage = err.error;
      this.spinner = false;
    });
  }

  onScroll() {
    this.startPage++;
    this.profileService.getUserPosts(this.router.url.slice(9), this.startPage).subscribe(post => {
      const posts = post.posts;
      posts.forEach(item => {
        this.posts.push(item);
      });
    });
  }
}
