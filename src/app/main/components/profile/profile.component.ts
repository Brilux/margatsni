import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../rest/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userInfo: any = {};

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.userInfo().subscribe(info => this.userInfo = info.user);
  }

}
