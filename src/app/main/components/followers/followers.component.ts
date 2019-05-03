import { Component, Inject, OnInit } from '@angular/core';
import { ProfileService } from '../../../rest/profile/profile.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UserModel } from '../../../rest/auth/user.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { FollowService } from '../../services/follow.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  public authorizedUser: string;
  public userId: number;
  public followers: UserModel[] = [];
  public spinner = true;
  public followingCount: number;

  constructor(private profileService: ProfileService,
              private followService: FollowService,
              private router: Router,
              private localStorageService: LocalStorageService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data) {
    this.followingCount = data.followingCount;
  }

  ngOnInit() {
    this.userId = this.data.userId;
    this.getAuthorizedUser();
    this.getFollowers(this.userId);
  }

  public getAuthorizedUser(): void {
    const userInfo = this.localStorageService.getUserInfo();
    if (userInfo) {
      this.authorizedUser = userInfo.user.username;
    }
  }

  public getFollowers(userId): void {
    this.profileService.getFollowers(userId).subscribe(response => {
      this.followers = response;
      this.spinner = false;
    });
  }

  public subscribe(userId): void {
    this.profileService.sendSubscribe(userId).subscribe(() => {
      const user: UserModel = this.followers.find(element => element.id === userId);
      user.followed = true;
    }, err => {
      if (err.statusText === 'Unauthorized') {
        this.router.navigate(['/login']);
      }
    });
    this.followingCount++;
    this.followService.changeFollowingCount(this.followingCount);
  }

  public unsubscribe(userId): void {
    this.profileService.sendUnSubscribe(userId).subscribe(() => {
      const user: UserModel = this.followers.find(element => element.id === userId);
      user.followed = false;
    });
    this.followingCount--;
    this.followService.changeFollowingCount(this.followingCount);
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }
}
