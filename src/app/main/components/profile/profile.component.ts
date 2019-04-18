import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../../rest/user-profile/profile.service';
import { PostInterface } from '../../../interfaces/post.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  searchedUser: string;
  startPage = 1;
  public posts: PostInterface[] = [];
  errorMessage: string;
  spinner = true;
  username: string;
  bio: string;
  userAvatar;

  constructor(private profileService: ProfileService,
              private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(() => {
      this.reloadProfile();
    });
  }

  public reloadProfile() {
    this.spinner = true;
    this.posts = [];
    this.errorMessage = '';
    this.username = '';
    this.bio = '';
    this.userAvatar = null;
    this.getUserProfile();
    this.getUserPosts();
  }

  public getUserPosts() {
    this.profileService.getUserPosts(this.router.url.slice(9), this.startPage).subscribe(post => {
      this.posts = post.posts;
      this.spinner = false;
    }, err => {
      this.errorMessage = err.error;
      this.spinner = false;
    });
  }

  public getUserProfile() {
    this.profileService.getUserProfileById(this.router.url.slice(9)).subscribe((info: PostInterface) => {
      this.username = info.user.username;
      this.bio = info.user.bio;
      this.userAvatar = info.user.image || 'assets/images/default-avatar.jpg';
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
