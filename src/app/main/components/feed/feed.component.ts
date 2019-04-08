import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../../rest/feed/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public posts: object[] = [];
  spinner = true;
  startPage = 1;

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.feedService.posts(this.startPage).subscribe(post => {
      this.posts = post.posts;
      this.spinner = false;
    });
  }

  onScroll() {
    this.startPage++;
    this.feedService.posts(this.startPage).subscribe(post => {
      const posts = post.posts;
      posts.forEach(item => {
        this.posts.push(item);
      });
    });
  }
}
