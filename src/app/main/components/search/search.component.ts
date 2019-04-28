import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../../rest/search/search.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public searchForm = new FormControl('');

  public username: string;

  public usersArray = [];
  public filteredUsersArray: Observable<any>;
  public userForSearch: string;
  public startPage = 1;
  public spinner: boolean;
  public loadButton: boolean;
  public loadMoreSpinner: boolean;
  public currentPage: number;
  public totalPages: number;

  constructor(private searchService: SearchService,
              private router: Router,
              private localStorageService: LocalStorageService) {
    this.searchForm.valueChanges.subscribe(user => {
      this.spinner = true;
      this.startPage = 1;
      this.getUsers(user.toLowerCase() || null);
    });
  }

  ngOnInit() {
    const userInfo = this.localStorageService.getUserInfo();
    this.username = userInfo.user.username;
  }

  public getUsers(user) {
    this.searchService.getUsersForSearchByUsername(user, this.startPage).subscribe(response => {
      this.usersArray = response.users;
      this.currentPage = response.page;
      this.totalPages = response.total_pages;
      if (this.currentPage >= this.totalPages) {
        this.loadButton = false;
      } else {
        this.loadButton = true;
      }
      this.userForSearch = user;
      this.spinner = false;
      this.autoCompleteFilter();
    });
  }

  public autoCompleteFilter() {
    this.filteredUsersArray = this.searchForm.valueChanges
      .pipe(
        startWith(''),
        map(user => {
          const filterUser = user.toLowerCase();
          return this.usersArray.filter(filteredUsers => filteredUsers.username.toLowerCase().indexOf(filterUser) === 0);
        })
      );
  }

  public loadMoreUsers(user) {
    this.startPage++;
    this.loadMoreSpinner = true;
    this.searchService.getUsersForSearchByUsername(user, this.startPage).subscribe(response => {
      this.currentPage = response.page;
      this.totalPages = response.total_pages;
      if (this.currentPage >= this.totalPages) {
        this.loadButton = false;
      } else {
        this.loadButton = true;
      }
      response.users.forEach(item => {
        this.usersArray.push(item);
      });
      this.loadMoreSpinner = false;
      this.autoCompleteFilter();
    });
  }
}
