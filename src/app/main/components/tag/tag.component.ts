import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../rest/search/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { PostModel } from '../../../models/post.model';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  public tag: string;
  public posts: PostModel[] = [];
  public spinner: boolean;
  public authorizedUser: string;

  constructor(private searchService: SearchService,
              private activeRoute: ActivatedRoute,
              private localStorageService: LocalStorageService,
              private router: Router) { }

  ngOnInit() {
    this.getAuthorizedUser();
    this.activeRoute.params.subscribe(() => {
      this.spinner = true;
      this.posts = [];
      this.getTagName();
      this.getPostsWithTag();
    });
  }

  public getAuthorizedUser(): void {
    const userInfo = this.localStorageService.getUserInfo();
    if (userInfo) {
      this.authorizedUser = userInfo.user.username;
    }
  }

  public getTagName(): void {
    this.tag = this.router.url.slice(5);
  }

  public getPostsWithTag(): void {
    this.searchService.getPostsWithTag(this.tag).subscribe(response => {
      this.posts = response.posts;
      this.spinner = false;
    });
  }
}
