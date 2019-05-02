import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../rest/posts/post.service';
import { ShareService } from '../../services/share.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LikeService } from '../../../rest/posts/like.service';
import { CommentService } from '../../../rest/posts/comment.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { PostModel } from '../../../models/post.model';
import { CommentModel } from '../../../models/comment.model';

@Component({
  selector: 'app-user-post-edit',
  templateUrl: './user-post-edit.component.html',
  styleUrls: ['./user-post-edit.component.css']
})
export class UserPostEditComponent implements OnInit {

  public post: PostModel;
  public postOwner: string;
  public postUserImage: string;
  public postImage: string;
  public postLiked: boolean;
  public postLikedCount: number;
  public postDescription: string;
  public comments: CommentModel[] = [];
  public authorizedUser: string;
  public postId: number;
  public spinner: boolean;
  public startPage = 1;
  public pageToLoad = 2;
  public likeResourceType = 'posts';
  public loadButton: boolean;

  public inputPostDescription = new FormControl('');
  public addCommentForm = new FormControl('');
  public inputCommentEdit = new FormControl('');

  constructor(private postService: PostService,
              private shareService: ShareService,
              private likeService: LikeService,
              private commentService: CommentService,
              private localStorageService: LocalStorageService,
              private router: Router) { }

  ngOnInit() {
    this.postId = this.shareService.postIdForEdit || parseInt(this.router.url.slice(11), 10);
    this.getPost();
    this.getAuthorizedUser();
  }

  public getAuthorizedUser(): void {
    const userInfo = this.localStorageService.getUserInfo();
    this.authorizedUser = userInfo.user.username;
  }

  public getPost(): void {
    this.spinner = true;
    this.postService.getPostById(this.postId).subscribe(post => {
      this.post = post;
      this.postOwner = post.user.username;
      this.postUserImage = post.user.image;
      this.postImage = post.image;
      this.postLiked = post.liked;
      this.postLikedCount = post.likes_count;
      this.postDescription = post.body;
    });
    this.commentService.getCommentById(this.postId, this.startPage).subscribe(response => {
      response.comments.forEach(item => {
        this.comments.unshift(item);
      });
      this.checkPages(response.page, response.total_pages);
      this.spinner = false;
    });
  }

  public checkPages(currentPage: number, totalPage: number): void {
    if (currentPage >= totalPage) {
      this.loadButton = false;
    } else {
      this.loadButton = true;
    }
  }

  public updatePost(): void {
    this.postService.updatePost(this.postId, this.inputPostDescription.value || this.post.body).subscribe(
      response => response,
        err => err);
  }

  public deletePost(): void {
    this.postService.deletePost(this.postId).subscribe(() => {
        this.router.navigate([ '/user-profile/' , this.post.user.username]);
    }, err => err);
  }

  public likePost(likeResource: string, postId: number): void {
    this.likeService.putLike(likeResource, postId).subscribe(() => {
      this.post.likes_count++;
      this.post.liked = true;
    });
  }

  public dislike(likeResource: string, postId: number): void {
    this.likeService.removeLike(likeResource, postId).subscribe(() => {
      this.post.likes_count--;
      this.post.liked = false;
    });
  }

  public addComment(postId: number): void {
    this.postService.sendComment(postId, this.addCommentForm.value).subscribe(comment => {
      this.comments.push(comment);
    }, err => err);
    this.addCommentForm.reset();
  }

  public deleteComment(postId: number, commentId: number, comment: CommentModel): void {
    this.commentService.deleteCommentById(postId, commentId).subscribe(() => {
      const commentIndex = this.comments.indexOf(comment);
      this.comments.splice(commentIndex, 1);
    });
  }

  public editComment(postId: number, commentId: number, comment: CommentModel) {
    this.commentService.editCommentById(this.inputCommentEdit.value, postId, commentId).subscribe( response => {
      comment.body = response.body;
      comment.toggleForEdit = false;
    });
  }

  public openEditComment(commentId: number): void {
    const comment: CommentModel = this.comments.find(element => element.id === commentId);
    if (comment.toggleForEdit === true) {
      comment.toggleForEdit = false;
    } else {
      comment.toggleForEdit = true;
    }
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

}
