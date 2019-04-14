import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../../rest/feed/feed.service';
import { FormControl } from '@angular/forms';
import { PostService } from '../../../rest/posts/post.service';
import { PostInterface } from '../../../interfaces/post.interface';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public posts: PostInterface[];
  spinner = true;
  startPage = 1;

  public addCommentForm = new FormControl('');

  constructor(private feedService: FeedService,
              private postService: PostService) {
  }

  ngOnInit() {
    this.getPosts(this.startPage);
  }

  public getPosts(pageNumber) {
    this.feedService.posts(pageNumber).subscribe(post => {
      this.posts = post.posts;
      this.spinner = false;
    });
  }

  public onScroll() {
    this.startPage++;
    this.feedService.posts(this.startPage).subscribe(post => {
      const posts = post.posts;
      posts.forEach(item => {
        this.posts.push(item);
      });
    });
  }

  public addComment(postId) {
    this.postService.sendComment(postId, this.addCommentForm.value).subscribe(response => {
      const post: PostInterface = this.posts.find(element => element.id === postId);
      post.comments.push(response.comment);
    }, err => err);
    this.addCommentForm.reset();
  }
}
