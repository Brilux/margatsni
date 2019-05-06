import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../../rest/search/search.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserModel } from '../../../rest/auth/user.model';
import { TagModel } from '../../../models/tag.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public searchForm = new FormControl('');

  public authorizedUser: string;

  public usersArray = [];
  public tagsArray = [];
  public filteredArray: Observable<UserModel[]> | Observable<TagModel[]>;
  public userForSearch: string;
  public startPage = 1;
  public spinner: boolean;
  public loadButton: boolean;
  public loadMoreSpinner: boolean;
  public currentPage: number;
  public totalPages: number;
  public avatarDisable: boolean;
  public tagForSearch: string;

  constructor(private searchService: SearchService,
              private router: Router,
              private localStorageService: LocalStorageService) {
    this.searchForm.valueChanges.subscribe(searchItem => {
      this.tagForSearch = null;
      if (searchItem.indexOf('#') === 0) {
        this.tagForSearch = searchItem;
        this.searchTag(searchItem || null);
        this.avatarDisable = true;
      } else {
        this.spinner = true;
        this.avatarDisable = false;
        this.startPage = 1;
        this.getUsers(searchItem.toLowerCase() || null);
      }
    });
  }

  ngOnInit() {
    this.getAuthorizedUser();
  }

  public getAuthorizedUser(): void {
    const userInfo = this.localStorageService.getUserInfo();
    if (userInfo) {
      this.authorizedUser = userInfo.user.username;
    }
  }

  public getUsers(user): void {
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
      this.autoCompleteUsersFilter();
    });
  }

  public autoCompleteUsersFilter(): void {
    this.filteredArray = this.searchForm.valueChanges
      .pipe(
        startWith(''),
        map(user => {
          const filterUser = user.toLowerCase();
          return this.usersArray.filter(filteredUsers => filteredUsers.username.toLowerCase().indexOf(filterUser) === 0);
        })
      );
  }

  public loadMoreUsers(user): void {
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
      this.autoCompleteUsersFilter();
    });
  }

  public searchTag(searchItem): void {
    if (searchItem.length > 1) {
      this.searchService.getTagByName(searchItem.slice(1)).subscribe(response => {
        this.tagsArray = [];
        this.tagsArray = response.tags;
        this.autoCompleteTagFilter();
      });
    }
  }

  public autoCompleteTagFilter(): void {
    this.filteredArray = this.searchForm.valueChanges
      .pipe(
        startWith(''),
        map(tag => {
          const filterTag = tag.toLowerCase();
          return this.tagsArray.filter(filteredTags => filteredTags.name.toLowerCase().indexOf(filterTag) === 0);
        })
      );
  }

}
