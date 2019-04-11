import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../rest/posts/post.service';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-user-post-edit',
  templateUrl: './user-post-edit.component.html',
  styleUrls: ['./user-post-edit.component.css']
})
export class UserPostEditComponent implements OnInit {

  postImage;
  postDescription: string;
  postId: number;

  constructor(private postService: PostService,
              private shareService: ShareService) { }

  ngOnInit() {
    this.postId = this.shareService.postId;
    this.getPost();
  }

  getPost() {
    this.postService.getPostById(this.postId).subscribe((post: any) => {
      this.postImage = post.post.image;
      this.postDescription = post.post.body;
    });
  }

  // updatePost() {
  //   this.postService.updatePost();
  // }

  deletePost() {
    this.postService.deletePost(this.postId).subscribe();
  }

}
