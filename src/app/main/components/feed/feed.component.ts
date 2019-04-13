import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../../rest/feed/feed.service';
import { FormControl } from '@angular/forms';
import { PostService } from '../../../rest/posts/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public posts: object[] = [];
  spinner = true;
  startPage = 1;
  comments;

  public addCommentForm = new FormControl('');

  constructor(private feedService: FeedService,
              private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }

  public getPosts() {
    this.feedService.posts(this.startPage).subscribe(post => {
      this.posts = post.posts;
      console.log(this.posts);
      this.comments = post.posts.comments;
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
    this.postService.sendComment(postId, this.addCommentForm.value).subscribe(response => response, err => err);
  }


}
