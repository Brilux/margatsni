import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../rest/user-profile/user-profile.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {

  username: string;
  email: string;
  bio: string;
  userUrl: number;
  userAvatar: string;
  newUserAvatar: File = null;

  public profileEditForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    bio: new FormControl(''),
    userAvatar: new FormControl(null)
  });

  constructor(private userProfileService: UserProfileService,
              private router: Router) { }

  ngOnInit() {
    this.userProfileService.userInfo().subscribe(info => {
      this.username = info.user.username;
      this.email = info.user.email;
      this.bio = info.user.bio;
      this.userAvatar = info.user.image || 'assets/images/default-avatar.jpg';
      this.userUrl = info.user.username;
    });
  }

  public onImageSelected(event) {
    this.newUserAvatar = <File>event.target.files[0];
  }

  public updateProfileInfo() {
    this.userProfileService.updateUserProfileInfo(
      this.profileEditForm.value.username || this.username,
      this.profileEditForm.value.email || this.email,
      this.profileEditForm.value.password || null,
      this.profileEditForm.value.bio || this.bio,
      this.newUserAvatar || this.userAvatar
    ).subscribe(() => {
      this.router.navigate(['/user-profile/', this.userUrl]);
    }, err => err);
  }
}
