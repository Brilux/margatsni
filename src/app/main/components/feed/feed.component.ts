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
  public spinner = true;
  public startPage = 1;
  public likeResourceType = 'posts';
  public infiniteScroll: boolean;
  public infiniteSpinner: boolean;
  public totalPages: number;

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
      this.totalPages = post.total_pages;
      this.spinner = false;
    });
  }

  public onScroll() {
    if (this.startPage === this.totalPages) {
      this.infiniteScroll = true;
    } else {
      this.infiniteSpinner = true;
      this.infiniteScroll = true;
      this.startPage++;
      this.feedService.posts(this.startPage).subscribe(post => {
        const posts = post.posts;
        this.totalPages = post.total_pages;
        posts.forEach(item => {
          this.posts.push(item);
        });
        this.infiniteSpinner = false;
        this.infiniteScroll = false;
      });
    }
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
      post.liked = true;
    });
  }

  public dislike(likeResource, postId) {
    this.likeService.removeLike(likeResource, postId).subscribe(() => {
      const post: PostInterface = this.posts.find(element => element.id === postId);
      post.likes_count--;
      post.liked = false;
    });
  }

  public postReview(postId) {
    this.shareService.postReview(postId);
  }
}
