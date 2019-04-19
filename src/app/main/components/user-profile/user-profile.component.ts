import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../rest/user-profile/user-profile.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { PostService } from '../../../rest/posts/post.service';
import { ShareService } from '../../services/share.service';

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
  public posts: object[] = [];
  startPage = 1;

  constructor(private userProfileService: UserProfileService,
              private postService: PostService,
              private authService: AuthService,
              private shareService: ShareService,
              private router: Router) { }

  ngOnInit() {
    this.userProfileService.userInfo().subscribe(info => {
      this.username = info.user.username;
      this.bio = info.user.bio;
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

}
