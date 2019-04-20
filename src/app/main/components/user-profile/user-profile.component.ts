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

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  username: string;
  bio: string;
  userAvatar;
  spinner = true;
  public posts: PostInterface[] = [];
  startPage = 1;
  userId: number;

  constructor(private userProfileService: UserProfileService,
              private postService: PostService,
              private authService: AuthService,
              private shareService: ShareService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.userProfileService.userInfo().subscribe(info => {
      this.username = info.user.username;
      this.bio = info.user.bio;
      this.userId = info.user.id;
      this.userAvatar = info.user.image || 'assets/images/default-avatar.jpg';
    });

    this.userProfileService.getUserProfilePosts(this.startPage).subscribe(post => {
      this.posts = post.posts;
      this.spinner = false;
    });
  }

  public onScroll() {
    this.startPage++;
    this.userProfileService.getUserProfilePosts(this.startPage).subscribe(post => {
      const posts = post.posts;
      posts.forEach(item => {
        this.posts.push(item);
      });
    });
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
      data: { userId: this.userId }
    });
  }

  public openFollowers() {
    this.dialog.open(FollowersComponent, {
      data: { userId: this.userId }
    });
  }
}
