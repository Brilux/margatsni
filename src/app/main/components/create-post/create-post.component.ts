import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  public createPostInput = new FormControl();

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  public createPost() {
    this.postService.sendPost(this.createPostInput.value).subscribe(
      response => response,
      err => err);
  }

}
