import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../rest/user-profile/user-profile.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  username: string;
  email: string;
  bio: string;

  public profileEditForm: FormGroup = new FormGroup({
    email: new FormControl(),
    username: new FormControl(),
    bio: new FormControl()
  });

  constructor(private profileService: UserProfileService) { }

  ngOnInit() {
    this.profileService.userInfo().subscribe(info => {
      this.username = info.user.username;
      this.email = info.user.email;
      this.bio = info.user.bio;
    });
  }

  updateProfileInfo() {
    this.profileService.updateUserInfo(
      this.profileEditForm.value.email || this.email,
      this.profileEditForm.value.username || this.username,
      this.profileEditForm.value.bio || this.bio).subscribe(response => console.log(response),
      err => console.log(err));
  }

}
