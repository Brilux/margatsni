import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileService } from '../../../rest/user-profile/user-profile.service';
import { ProfileService } from '../../../rest/profile/profile.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { MatDialog } from '@angular/material';
import { FollowersComponent } from '../followers/followers.component';
import { FollowingComponent } from '../following/following.component';
import { PostModel } from '../../../models/post.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public startPage = 1;
  public posts: PostModel[] = [];
  public errorMessage: string;
  public spinner = true;
  public username: string;
  public bio: string;
  public userAvatar;
  public userId: number;
  public subscribeStatus: boolean;
  public authorizedUser: string;
  public followersCount: number;
  public followingCount: number;
  public infiniteScroll: boolean;
  public infiniteSpinner: boolean;
  public totalPages: number;

  constructor(private userProfileService: UserProfileService,
              private profileService: ProfileService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private localStorageService: LocalStorageService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(() => {
      this.reloadProfile();
    });
    this.getAuthorizedUser();
  }

  public reloadProfile(): void {
    this.spinner = true;
    this.startPage = 1;
    this.posts = [];
    this.errorMessage = '';
    this.username = '';
    this.bio = '';
    this.userAvatar = null;
    this.userId = null;
    this.subscribeStatus = null;
    this.followersCount = null;
    this.followingCount = null;
    this.infiniteScroll = null;
    this.totalPages = null;
    this.getUserProfile();
    this.getUserPosts();
  }

  public getAuthorizedUser(): void {
    const userInfo = this.localStorageService.getUserInfo();
    if (userInfo) {
      this.authorizedUser = userInfo.user.username;
    }
  }

  public getUserPosts(): void {
    this.profileService.getUserPostsByUsername(this.router.url.slice(9), this.startPage).subscribe(post => {
      this.posts = post.posts;
      this.totalPages = post.total_pages;
      this.spinner = false;
    }, err => {
      const errorMessage = Object.keys(err.error.errors);
      this.errorMessage = `${errorMessage[0]} ${err.error.errors[errorMessage[0]]}`;
      this.spinner = false;
    });
  }

  public getUserProfile(): void {
    this.profileService.getUserProfileByUsername(this.router.url.slice(9)).subscribe(response => {
      this.userId = response.id;
      this.getSubscribe(this.userId);
      this.getFollowingCount(this.userId);
      this.username = response.username;
      this.bio = response.bio;
      this.userAvatar = response.image || 'assets/images/default-avatar.png';
    });
  }

  public getSubscribe(userId): void {
    this.profileService.getFollowers(userId).subscribe(response => {
      this.followersCount = response.length;
      const follower = response.find(element => element.username === this.authorizedUser);
      this.subscribeStatus = follower === undefined;
    });
  }

  public getFollowingCount(userId): void {
    this.profileService.getFollowing(userId).subscribe(response => {
      this.followingCount = response.length;
    });
  }

  public subscribe(userId): void {
    this.profileService.sendSubscribe(userId).subscribe(() => {
      this.subscribeStatus = false;
      this.followersCount++;
    }, err => {
      if (err.statusText === 'Unauthorized') {
        this.router.navigate(['/login']);
      }
    });
  }

  public unsubscribe(userId): void {
    this.profileService.sendUnSubscribe(userId).subscribe(() => {
      this.subscribeStatus = true;
      this.followersCount--;
    });
  }

  public onScroll(): void {
    if (this.startPage === this.totalPages) {
      this.infiniteScroll = true;
    } else {
      this.infiniteSpinner = true;
      this.infiniteScroll = true;
      this.startPage++;
      this.profileService.getUserPostsByUsername(this.router.url.slice(9), this.startPage).subscribe(post => {
        const posts = post.posts;
        this.totalPages = post.total_pages;
        posts.forEach(item => {
          this.posts.push(item);
        });
        this.infiniteSpinner = false;
        this.infiniteScroll = false;
      });
    }
  }

  public openFollowing(): void {
    this.dialog.open(FollowingComponent, {
      data: { userId: this.userId },
      width: '400px'
    });
  }

  public openFollowers(): void {
    this.dialog.open(FollowersComponent, {
      data: { userId: this.userId },
      width: '400px'
    });
  }
}
