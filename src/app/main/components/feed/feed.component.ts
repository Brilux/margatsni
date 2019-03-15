import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../../rest/feed/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public posts: [] = [];

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.feedService.posts().subscribe(post => this.posts = post.posts);
  }

}
