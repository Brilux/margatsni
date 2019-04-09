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

  public searchForm = new FormControl('');

  constructor(private searchService: SearchService,
              private router: Router) { }

  ngOnInit() {
  }

  public searchUser() {
    this.router.navigate(['profile', this.searchForm.value]);
  }
}
