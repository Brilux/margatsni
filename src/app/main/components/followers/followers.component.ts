import { Component, Inject, OnInit } from '@angular/core';
import { ProfileService } from '../../../rest/profile/profile.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  public userId: number;
  public followers: [] = [];
  public spinner = true;

  constructor(private profileService: ProfileService,
               private dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.userId = this.data.userId;
    this.getFollowers(this.userId);
  }

  public getFollowers(userId): void {
    this.profileService.getFollowers(userId).subscribe(response => {
      this.followers = response;
      this.spinner = false;
    });
  }

  public closeDialog(): void {
    this.dialog.closeAll();
  }
}
