import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileService } from '../../../rest/user-profile/user-profile.service';
import { PostInterface } from '../../../interfaces/post.interface';
import { ProfileService } from '../../../rest/profile/profile.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { MatDialog } from '@angular/material';
import { FollowersComponent } from '../followers/followers.component';
import { FollowingComponent } from '../following/following.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public startPage = 1;
  public posts: PostInterface[] = [];
  public errorMessage: string;
  public spinner = true;
  public username: string;
  public bio: string;
  public userAvatar;
  public userId: number;
  public subscribeStatus: boolean;
  public authorizedUser: string;

  constructor(private userProfileService: UserProfileService,
              private profileService: ProfileService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private localStorageService: LocalStorageService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(() => {
      this.reloadProfile();
    });
    this.getAuthorizedUser();
  }

  public reloadProfile() {
    this.spinner = true;
    this.posts = [];
    this.errorMessage = '';
    this.username = '';
    this.bio = '';
    this.userAvatar = null;
    this.userId = null;
    this.subscribeStatus = null;
    this.authorizedUser = '';
    this.getUserProfile();
    this.getUserPosts();
  }

  public getAuthorizedUser() {
    const userInfo = this.localStorageService.getUserInfo();
    this.authorizedUser = userInfo.user.username;
  }

  public getUserPosts() {
    this.profileService.getUserPostsByUsername(this.router.url.slice(9), this.startPage).subscribe(post => {
      this.posts = post.posts;
      this.spinner = false;
    }, err => {
      this.errorMessage = err.error;
      this.spinner = false;
    });
  }

  public getUserProfile() {
    this.profileService.getUserProfileByUsername(this.router.url.slice(9)).subscribe((info: PostInterface) => {
      this.userId = info.user.id;
      this.getSubscribe(this.userId);
      this.username = info.user.username;
      this.bio = info.user.bio;
      this.userAvatar = info.user.image || 'assets/images/default-avatar.jpg';
    });
  }

  public getSubscribe(userId) {
    this.profileService.getFollowers(userId).subscribe(response => {
      const follower = response.find(element => element.username === this.authorizedUser);
      if (follower === undefined) {
        this.subscribeStatus = true;
      } else {
        this.subscribeStatus = false;
      }
    });
  }

  public subscribe(userId) {
    this.profileService.sendSubscribe(userId).subscribe(() => {
      this.subscribeStatus = false;
    });
  }

  public unsubscribe(userId) {
    this.profileService.sendUnSubscribe(userId).subscribe(() => {
      this.subscribeStatus = true;
    });
  }

  onScroll() {
    this.startPage++;
    this.profileService.getUserPostsByUsername(this.router.url.slice(9), this.startPage).subscribe(post => {
      const posts = post.posts;
      posts.forEach(item => {
        this.posts.push(item);
      });
    });
  }

  public openFollowing() {
    this.dialog.open(FollowingComponent, {
      data: { userId: this.userId },
      width: '400px'
    });
  }

  public openFollowers() {
    this.dialog.open(FollowersComponent, {
      data: { userId: this.userId },
      width: '400px'
    });
  }
}
