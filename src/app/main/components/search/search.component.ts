import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../../rest/search/search.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public searchForm = new FormControl('');
  public username: string;

  constructor(private searchService: SearchService,
              private router: Router,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    const userInfo = this.localStorageService.getUserInfo();
    this.username = userInfo.user.username;
  }

  public searchUser() {
    if (this.username === this.searchForm.value) {
      this.router.navigate(['user-profile', this.searchForm.value]);
    } else {
      this.router.navigate(['profile', this.searchForm.value]);
    }
    this.searchForm.reset();
  }
}
