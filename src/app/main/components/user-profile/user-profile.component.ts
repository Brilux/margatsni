import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../rest/user-profile/user-profile.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { PostService } from '../../../rest/posts/post.service';
import { ShareService } from '../../services/share.service';
import { FollowingComponent } from '../following/following.component';
import { FollowersComponent } from '../followers/followers.component';
import { MatDialog } from '@angular/material';
import { PostInterface } from '../../../interfaces/post.interface';
import { ProfileService } from '../../../rest/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public username: string;
  public bio: string;
  public userAvatar;
  public spinner = true;
  public posts: PostInterface[] = [];
  public startPage = 1;
  public userId: number;
  public followersCount: number;
  public followingCount: number;
  public infiniteScroll: boolean;
  public infiniteSpinner: boolean;
  public totalPages: number;

  constructor(private userProfileService: UserProfileService,
              private postService: PostService,
              private authService: AuthService,
              private shareService: ShareService,
              private router: Router,
              private dialog: MatDialog,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.userProfileService.userInfo().subscribe(info => {
      this.username = info.user.username;
      this.bio = info.user.bio;
      this.userId = info.user.id;
      this.getFollowersCount(this.userId);
      this.getFollowingCount(this.userId);
      this.userAvatar = info.user.image || 'assets/images/default-avatar.jpg';
    });

    this.userProfileService.getUserProfilePosts(this.startPage).subscribe(post => {
      this.posts = post.posts;
      this.totalPages = post.total_pages;
      this.spinner = false;
    });
  }

  public getFollowersCount(userId) {
    this.profileService.getFollowers(userId).subscribe(response => {
      this.followersCount = response.length;
    });
  }

  public getFollowingCount(userId) {
    this.profileService.getFollowing(userId).subscribe(response => {
      this.followingCount = response.length;
    });
  }

  public onScroll() {
    if (this.startPage === this.totalPages) {
      this.infiniteScroll = true;
    } else {
      this.infiniteSpinner = true;
      this.infiniteScroll = true;
      this.startPage++;
      this.userProfileService.getUserProfilePosts(this.startPage).subscribe(post => {
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

  public logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  public editPost(postId) {
    this.shareService.editPost(postId);
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
