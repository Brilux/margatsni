import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../../rest/feed/feed.service';
import { FormControl } from '@angular/forms';
import { PostService } from '../../../rest/posts/post.service';
import { ShareService } from '../../services/share.service';
import { LikeService } from '../../../rest/posts/like.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { PostModel } from '../../../models/post.model';
import { CommentModel } from '../../../models/comment.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public posts: PostModel[];
  // public comments: CommentModel[];
  public authorizedUser: string;
  public spinner = true;
  public startPage = 1;
  public likeResourceTypePost = 'posts';
  public likeResourceTypeComment = 'comments';
  public infiniteScroll: boolean;
  public infiniteSpinner: boolean;
  public totalPages: number;

  public addCommentForm = new FormControl('');

  constructor(private feedService: FeedService,
              private postService: PostService,
              private shareService: ShareService,
              private localStorageService: LocalStorageService,
              private likeService: LikeService) {
  }

  ngOnInit() {
    this.getAuthorizedUser();
    this.getPosts(this.startPage);
  }

  public getAuthorizedUser(): void {
    const userInfo = this.localStorageService.getUserInfo();
    if (userInfo) {
      this.authorizedUser = userInfo.user.username;
    }
  }

  public getPosts(pageNumber): void {
    this.feedService.getPosts(pageNumber).subscribe(response => {
      this.posts = response.posts;
      this.totalPages = response.total_pages;
      this.spinner = false;
    });
  }

  public onScroll(): void {
    if (this.startPage === this.totalPages) {
      this.infiniteScroll = true;
    } else {
      this.infiniteSpinner = true;
      this.infiniteScroll = true;
      this.startPage++;
      this.feedService.getPosts(this.startPage).subscribe(post => {
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

  public addComment(postId): void {
    this.postService.sendComment(postId, this.addCommentForm.value).subscribe(comment => {
      const post: PostModel = this.posts.find(element => element.id === postId);
      post.comments.push(comment);
    }, err => err);
    this.addCommentForm.reset();
  }

  public likePost(likeResource, postId): void {
    this.likeService.putLike(likeResource, postId).subscribe(() => {
      const post: PostModel = this.posts.find(element => element.id === postId);
      post.likes_count++;
      post.liked = true;
    });
  }

  public dislike(likeResource, postId): void {
    this.likeService.removeLike(likeResource, postId).subscribe(() => {
      const post: PostModel = this.posts.find(element => element.id === postId);
      post.likes_count--;
      post.liked = false;
    });
  }

  public likeComment(likeResource: string, commentId: number, post: PostModel): void {
    this.likeService.putLike(likeResource, commentId).subscribe(() => {
      const comment: CommentModel = post.comments.find(element => element.id === commentId);
      comment.likes_count++;
      comment.liked = true;
    });
  }

  public dislikeComment(likeResource: string, commentId: number, post: PostModel): void {
    this.likeService.removeLike(likeResource, commentId).subscribe(() => {
      const comment: CommentModel = post.comments.find(element => element.id === commentId);
      comment.likes_count--;
      comment.liked = false;
    });
  }

  public postReview(postId): void {
    this.shareService.postReview(postId);
  }
}
