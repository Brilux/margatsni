import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../rest/profile/profile.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  userInfo = {};

  public profileEditForm: FormGroup = new FormGroup({
    email: new FormControl(),
    username: new FormControl(),
    bio: new FormControl()
  });

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.userInfo().subscribe(info => this.userInfo = info.user);
  }

  updateProfileInfo() {
    this.profileService.updateUserInfo(this.profileEditForm.value.email,
      this.profileEditForm.value.username,
      this.profileEditForm.value.bio).subscribe(response => console.log(response),
      err => console.log(err));
  }

}
