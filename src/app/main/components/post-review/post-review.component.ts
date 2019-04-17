import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../../rest/feed/feed.service';
import { ShareService } from '../../services/share.service';
import { CommentService } from '../../../rest/posts/comment.service';
import { PostService } from '../../../rest/posts/post.service';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.component.html',
  styleUrls: ['./post-review.component.css']
})
export class PostReviewComponent implements OnInit {

  postId: number | string;
  postImage;
  postOwner: string;
  postDescription: string;
  comments: string[];
  startPage = 1;
  user: string;

  public addCommentForm = new FormControl('');

  constructor(private feedService: FeedService,
              private shareService: ShareService,
              private commentService: CommentService,
              private postService: PostService,
              private localStorageService: LocalStorageService,
              private router: Router) { }

  ngOnInit() {
    this.postId = this.shareService.postIdForReview || this.router.url.slice(13);
    this.getPost(this.postId);
    this.getUser();
  }

  public getUser() {
    const userInfo = this.localStorageService.getUserInfo();
    this.user = userInfo.user.username;
  }

  public getPost(postId) {
    this.feedService.getPostsById(postId).subscribe(post => {
      this.postImage = post.post.image;
      this.postOwner = post.post.user.username;
      this.postDescription = post.post.body;
      this.comments = post.post.comments;
    });
  }

  public getComments(postId: number | string, page: number) {
    this.startPage++;
    this.commentService.getCommentById(postId, page).subscribe(response => {
      response.comments.forEach(item => {
        this.comments.push(item);
      });
    });
  }

  public addComment(postId) {
    this.postService.sendComment(postId, this.addCommentForm.value).subscribe(response => {
      this.comments.push(response.comment);
    }, err => err);
    this.addCommentForm.reset();
  }

  public deleteComment(postId: number | string, commentId: number, comment) {
    this.commentService.deleteCommentById(postId, commentId).subscribe(() => {
      const commentIndex = this.comments.indexOf(comment);
      this.comments.splice(commentIndex, 1);
    });
  }
}
