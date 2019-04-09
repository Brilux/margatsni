import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../rest/search/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  startPage = 1;
  public posts: object[] = [];
  errorMessage: string;

  constructor(private searchService: SearchService,
              private router: Router) { }

  ngOnInit() {
    this.searchService.getUserPosts(this.router.url.slice(9), this.startPage).subscribe(post => {
        this.posts = post.posts;
      }, err => this.errorMessage = err.error);
  }
}
