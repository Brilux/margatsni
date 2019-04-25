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

  constructor(private searchService: SearchService,
              private router: Router,
              private localStorageService: LocalStorageService) {
    this.searchForm.valueChanges.subscribe(user => {
      this.getUsers(user || null);
    });
  }

  ngOnInit() {
    const userInfo = this.localStorageService.getUserInfo();
    this.username = userInfo.user.username;
  }

  public getUsers(user) {
    this.searchService.getUsersForSearchByUsername(user).subscribe(response => {
      this.usersArray = response.users;
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
}
