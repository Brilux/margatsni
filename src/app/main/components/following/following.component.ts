import { Component, Inject, OnInit } from '@angular/core';
import { ProfileService } from '../../../rest/profile/profile.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  public userId: number;
  public following: [] = [];
  spinner = true;

  constructor(private profileService: ProfileService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.userId = this.data.userId;
    this.getFollowing(this.userId);
  }

  public getFollowing(userId) {
    this.profileService.getFollowing(userId).subscribe(response => {
      this.following = response;
      this.spinner = false;
    });
  }

  public closeDialog() {
    this.dialog.closeAll();
  }
}
