import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../../rest/search/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  startPage = 1;
  public searchForm = new FormControl();

  constructor(private searchService: SearchService,
              private router: Router) { }

  ngOnInit() {
  }

  public searchUser() {
    this.searchService.getUserPosts(this.searchForm.value, this.startPage).subscribe(response => response);
    this.router.navigate(['profile', this.searchForm.value]);
  }
}
