import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../rest/user-profile/profile.service';
import { FormControl, FormGroup } from '@angular/forms';

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

  public profileEditForm: FormGroup = new FormGroup({
    email: new FormControl(),
    username: new FormControl(),
    bio: new FormControl()
  });

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.userInfo().subscribe(info => {
      this.username = info.user.username;
      this.email = info.user.email;
      this.bio = info.user.bio;
      this.userUrl = info.user.id;
    });
  }

  updateProfileInfo() {
    this.profileService.updateUserProfileInfo(
      this.profileEditForm.value.email || this.email,
      this.profileEditForm.value.username || this.username,
      this.profileEditForm.value.bio || this.bio).subscribe(response => response,
      err => err);
  }

}
