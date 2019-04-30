import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../rest/search/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostInterface } from '../../../interfaces/post.interface';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  public tag: string;
  public posts: PostInterface[] = [];
  public spinner = true;
  public authorizedUser: string;

  constructor(private searchService: SearchService,
              private activeRoute: ActivatedRoute,
              private localStorageService: LocalStorageService,
              private router: Router) { }

  ngOnInit() {
    this.getAuthorizedUser();
    this.activeRoute.params.subscribe(() => {
      this.posts = [];
      this.getTagName();
      this.getPostsWithTag();
    });
  }

  public getAuthorizedUser() {
    const userInfo = this.localStorageService.getUserInfo();
    if (userInfo) {
      this.authorizedUser = userInfo.user.username;
    }
  }

  public getTagName() {
    this.tag = this.router.url.slice(8);
  }

  public getPostsWithTag() {
    this.searchService.getTagByName(this.tag).subscribe(response => {
      this.posts = response.posts;
      const fakePost = {
        body: null,
        comments: null,
        create_at: null,
        id: null,
        image: null,
        liked: null,
        likes_count: null,
        user: null,
      };
      const checkMissingPosts = this.posts.length % 3;
      if (checkMissingPosts === 1) {
        this.posts.push(fakePost, fakePost);
      }
      if (checkMissingPosts === 2) {
        this.posts.push(fakePost);
      }
      this.spinner = false;
    });
  }
}
