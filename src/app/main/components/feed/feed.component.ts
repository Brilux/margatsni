import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../../rest/feed/feed.service';
import { FormControl } from '@angular/forms';
import { PostService } from '../../../rest/posts/post.service';
import { PostInterface } from '../../../interfaces/post.interface';
import { ShareService } from '../../services/share.service';
import { LikeService } from '../../../rest/posts/like.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public posts: PostInterface[];
  spinner = true;
  startPage = 1;
  likeResourceType = 'posts';

  public addCommentForm = new FormControl('');

  constructor(private feedService: FeedService,
              private postService: PostService,
              private shareService: ShareService,
              private likeService: LikeService) {
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

  public likePost(likeResource, postId) {
    this.likeService.putLike(likeResource, postId).subscribe(() => {
      const post: PostInterface = this.posts.find(element => element.id === postId);
      post.likes_count++;
    });
  }

  public dislike(likeResource, postId) {
    this.likeService.removeLike(likeResource, postId).subscribe(() => {
      const post: PostInterface = this.posts.find(element => element.id === postId);
      post.likes_count--;
    });
  }

  public postReview(postId) {
    this.shareService.postReview(postId);
  }
}
