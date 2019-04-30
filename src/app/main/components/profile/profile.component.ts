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

  public reloadProfile() {
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

  public getAuthorizedUser() {
    const userInfo = this.localStorageService.getUserInfo();
    if (userInfo) {
      this.authorizedUser = userInfo.user.username;
    }
  }

  public getUserPosts() {
    this.profileService.getUserPostsByUsername(this.router.url.slice(9), this.startPage).subscribe(post => {
      this.posts = post.posts;
      const fakePost = {
        body: null,
        comments: null,
        create_at: null,
        id: null,
        image: null,
        liked: null,
        likes_count: null,
        user: null,
      };
      const checkMissingPosts = this.posts.length % 3;
      if (checkMissingPosts === 1) {
        this.posts.push(fakePost, fakePost);
      }
      if (checkMissingPosts === 2) {
        this.posts.push(fakePost);
      }
      this.totalPages = post.total_pages;
      this.spinner = false;
    }, err => {
      const errorMessage = Object.keys(err.error.errors);
      this.errorMessage = `${errorMessage[0]} ${err.error.errors[errorMessage[0]]}`;
      this.spinner = false;
    });
  }

  public getUserProfile() {
    this.profileService.getUserProfileByUsername(this.router.url.slice(9)).subscribe((info: PostInterface) => {
      this.userId = info.user.id;
      this.getSubscribe(this.userId);
      this.getFollowingCount(this.userId);
      this.username = info.user.username;
      this.bio = info.user.bio;
      this.userAvatar = info.user.image || 'assets/images/default-avatar.png';
    });
  }

  public getSubscribe(userId) {
    this.profileService.getFollowers(userId).subscribe(response => {
      this.followersCount = response.length;
      const follower = response.find(element => element.username === this.authorizedUser);
      if (follower === undefined) {
        this.subscribeStatus = true;
      } else {
        this.subscribeStatus = false;
      }
    });
  }

  public getFollowingCount(userId) {
    this.profileService.getFollowing(userId).subscribe(response => {
      this.followingCount = response.length;
    });
  }

  public subscribe(userId) {
    this.profileService.sendSubscribe(userId).subscribe(() => {
      this.subscribeStatus = false;
      this.followersCount++;
    }, err => {
      if (err.statusText === 'Unauthorized') {
        this.router.navigate(['/login']);
      }
    });
  }

  public unsubscribe(userId) {
    this.profileService.sendUnSubscribe(userId).subscribe(() => {
      this.subscribeStatus = true;
      this.followersCount--;
    });
  }

  onScroll() {
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
