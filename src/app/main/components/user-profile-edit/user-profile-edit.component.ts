import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../rest/user-profile/user-profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const emailValidateRegex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {

  public username: string;
  public email: string;
  public bio: string;
  public userUrl: string;
  public userAvatar: string;
  public newUserAvatar: File = null;
  public imgURL: string | ArrayBuffer;
  public errorMessage: string;
  public spinner = true;
  public responseError: string;

  public profileEditForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.pattern(emailValidateRegex)]),
    password: new FormControl('', Validators.minLength(6)),
    passwordConfirm: new FormControl(''),
    bio: new FormControl('', Validators.maxLength(300)),
    userAvatar: new FormControl(null)
  }, {
    validators: (validator) => {
      if (validator.value.password !== validator.value.passwordConfirm) {
        return {
          'passwordError': true
        };
      }
      return null;
    }
  });

  constructor(private userProfileService: UserProfileService,
              private router: Router) { }

  ngOnInit() {
    this.getUserInfo();
  }

  public getUserInfo(): void {
    this.userProfileService.userInfo().subscribe(info => {
      this.username = info.user.username;
      this.email = info.user.email;
      this.bio = info.user.bio;
      this.userAvatar = info.user.image || 'assets/images/default-avatar.png';
      this.userUrl = info.user.username;
      this.spinner = false;
    });
  }

  public onImageSelected(event, files): void {
    if (files[0].type.match(/image\/*/) == null) {
      this.errorMessage = 'Only images are supported.';
      return;
    } else {
      this.errorMessage = '';
      this.newUserAvatar = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.imgURL = reader.result;
      };
    }
  }

  public updateProfileInfo(): void {
    this.userProfileService.updateUserProfileInfo(
      this.profileEditForm.value.email || this.email,
      this.profileEditForm.value.password || null,
      this.profileEditForm.value.bio || this.bio || '',
      this.newUserAvatar || this.userAvatar
    ).subscribe(() => {
      this.router.navigate(['/user-profile/', this.userUrl]);
    }, err => {
      const errorMessage = Object.keys(err.error.errors);
      this.responseError = `${errorMessage[0]} ${err.error.errors[errorMessage[0]]}`;
    });
  }
}
