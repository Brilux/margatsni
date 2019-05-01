import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../../rest/feed/feed.service';
import { ShareService } from '../../services/share.service';
import { CommentService } from '../../../rest/posts/comment.service';
import { PostService } from '../../../rest/posts/post.service';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { LikeService } from '../../../rest/posts/like.service';
import { CommentModel } from '../../../models/comment.model';

@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.component.html',
  styleUrls: ['./post-review.component.css']
})
export class PostReviewComponent implements OnInit {

  public post;
  public postId: number;
  public postImage;
  public postOwner: string;
  public postDescription: string;
  public comments: CommentModel[] = [];
  public startPage = 1;
  public pageToLoad = 2;
  public authorizedUser: string;
  public loadButton: boolean;
  public spinner = true;
  public likeResourceType = 'posts';
  public postLiked: boolean;
  public postLikedCount: number;
  public postUserImage: string;

  public addCommentForm = new FormControl('');

  constructor(private feedService: FeedService,
              private shareService: ShareService,
              private commentService: CommentService,
              private postService: PostService,
              private localStorageService: LocalStorageService,
              private likeService: LikeService,
              private router: Router) { }

  ngOnInit() {
    this.postId = this.shareService.postIdForReview || parseInt(this.router.url.slice(13) , 10);
    this.getPost(this.postId);
    this.getAuthorizedUser();
  }

  public getAuthorizedUser(): void {
    const userInfo = this.localStorageService.getUserInfo();
    if (userInfo) {
      this.authorizedUser = userInfo.user.username;
    }
  }

  public getPost(postId: number): void {
    this.feedService.getPostsById(postId).subscribe(post => {
      this.post = post;
      this.postImage = post.image;
      this.postOwner = post.user.username;
      this.postDescription = post.body;
      this.postLiked = post.liked;
      this.postLikedCount = post.likes_count;
      this.postUserImage = post.user.image;
    });
    this.commentService.getCommentById(postId, this.startPage).subscribe(response => {
      response.comments.forEach(item => {
        this.comments.unshift(item);
      });
      this.checkPages(response.page, response.total_pages);
      this.spinner = false;
    });
  }

  public getComments(postId: number, page: number): void {
    this.pageToLoad++;
    this.commentService.getCommentById(postId, page).subscribe(response => {
      response.comments.forEach(item => {
        this.comments.unshift(item);
      });
      this.checkPages(response.page, response.total_pages);
    });
  }

  public checkPages(currentPage: number, totalPage: number): void {
    if (currentPage >= totalPage) {
      this.loadButton = false;
    } else {
      this.loadButton = true;
    }
  }

  public likePost(likeResource, postId): void {
    this.likeService.putLike(likeResource, postId).subscribe(() => {
      this.postLikedCount++;
      this.postLiked = true;
    }, err => {
      if (err.statusText === 'Unauthorized') {
        this.router.navigate(['/login']);
      }
    });
  }

  public dislike(likeResource, postId): void {
    this.likeService.removeLike(likeResource, postId).subscribe(() => {
      this.postLikedCount--;
      this.postLiked = false;
    });
  }

  public addComment(postId): void {
    this.postService.sendComment(postId, this.addCommentForm.value).subscribe(comment => {
      this.comments.push(comment);
    }, err => {
      if (err.statusText === 'Unauthorized') {
        this.router.navigate(['/login']);
      }
    });
    this.addCommentForm.reset();
  }

  public deleteComment(postId: number, commentId: number, comment): void {
    this.commentService.deleteCommentById(postId, commentId).subscribe(() => {
      const commentIndex = this.comments.indexOf(comment);
      this.comments.splice(commentIndex, 1);
    });
  }
}
