import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../rest/posts/post.service';
import { ShareService } from '../../services/share.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LikeService } from '../../../rest/posts/like.service';
import { CommentService } from '../../../rest/posts/comment.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-user-post-edit',
  templateUrl: './user-post-edit.component.html',
  styleUrls: ['./user-post-edit.component.css']
})
export class UserPostEditComponent implements OnInit {

  public postImage;
  public postDescription: string;
  public postId: number;
  public userUrl: string;
  public spinner = true;
  public postUserImage: string;
  public postOwner: string;
  public startPage = 1;
  public pageToLoad = 2;
  public likeResourceType = 'posts';
  public comments: string[] = [];
  public postLiked: boolean;
  public postLikedCount: number;
  public loadButton: boolean;
  public user: string;

  public inputPostDescription = new FormControl('');
  public addCommentForm = new FormControl('');

  constructor(private postService: PostService,
              private shareService: ShareService,
              private likeService: LikeService,
              private commentService: CommentService,
              private localStorageService: LocalStorageService,
              private router: Router) { }

  ngOnInit() {
    this.postId = this.shareService.postIdForEdit || parseInt(this.router.url.slice(11), 10);
    this.getPost();
    this.getUser();
  }

  public getUser() {
    const userInfo = this.localStorageService.getUserInfo();
    this.user = userInfo.user.username;
  }

  public getPost() {
    this.postService.getPostById(this.postId).subscribe(post => {
      this.postImage = post.post.image;
      this.postDescription = post.post.body;
      this.userUrl = post.post.user.username;
      this.postOwner = post.post.user.username;
      this.postUserImage = post.post.user.image;
      this.postLiked = post.post.liked;
      this.postLikedCount = post.post.likes_count;
      this.spinner = false;
    });
    this.commentService.getCommentById(this.postId, this.startPage).subscribe(response => {
      response.comments.forEach(item => {
        this.comments.unshift(item);
      });
      this.checkPages(response.page, response.total_pages);
      this.spinner = false;
    });
  }

  public checkPages(currentPage: number, totalPage: number) {
    if (currentPage >= totalPage) {
      this.loadButton = false;
    } else {
      this.loadButton = true;
    }
  }

  public updatePost() {
    this.postService.updatePost(this.postId, this.inputPostDescription.value || this.postDescription).subscribe(
      response => response,
        err => err);
  }

  public deletePost() {
    this.postService.deletePost(this.postId).subscribe(response => response, err => err);
  }

  public likePost(likeResource, postId) {
    this.likeService.putLike(likeResource, postId).subscribe(() => {
      this.postLikedCount++;
      this.postLiked = true;
    });
  }

  public dislike(likeResource, postId) {
    this.likeService.removeLike(likeResource, postId).subscribe(() => {
      this.postLikedCount--;
      this.postLiked = false;
    });
  }

  public addComment(postId) {
    this.postService.sendComment(postId, this.addCommentForm.value).subscribe(response => {
      this.comments.push(response.comment);
    }, err => err);
    this.addCommentForm.reset();
  }

  public deleteComment(postId: number, commentId: number, comment) {
    this.commentService.deleteCommentById(postId, commentId).subscribe(() => {
      const commentIndex = this.comments.indexOf(comment);
      this.comments.splice(commentIndex, 1);
    });
  }

  public getComments(postId: number, page: number) {
    this.pageToLoad++;
    this.commentService.getCommentById(postId, page).subscribe(response => {
      response.comments.forEach(item => {
        this.comments.unshift(item);
      });
      this.checkPages(response.page, response.total_pages);
    });
  }

}
