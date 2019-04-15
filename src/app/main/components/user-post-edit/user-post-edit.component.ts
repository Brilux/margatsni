import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../rest/posts/post.service';
import { ShareService } from '../../services/share.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-post-edit',
  templateUrl: './user-post-edit.component.html',
  styleUrls: ['./user-post-edit.component.css']
})
export class UserPostEditComponent implements OnInit {

  postImage;
  postDescription: string;
  postId: number;
  userUrl: string;

  public inputPostDescription = new FormControl('');

  constructor(private postService: PostService,
              private shareService: ShareService) { }

  ngOnInit() {
    this.postId = this.shareService.postIdForEdit;
    this.getPost();
  }

  getPost() {
    this.postService.getPostById(this.postId).subscribe(post => {
      this.postImage = post.post.image;
      this.postDescription = post.post.body;
      this.userUrl = post.post.user.username;
    });
  }

  updatePost() {
    this.postService.updatePost(this.postId, this.inputPostDescription.value || this.postDescription).subscribe(
      response => response,
        err => err);
  }

  deletePost() {
    this.postService.deletePost(this.postId).subscribe(response => response, err => err);
  }

}
