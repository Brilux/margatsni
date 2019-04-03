import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  postImage: File = null;

  public postForm: FormGroup = new FormGroup({
    createPostDescription: new FormControl(),
    createPostImage: new FormControl()
  });

  constructor(private postService: PostService,
              private router: Router) { }

  ngOnInit() {
  }

  public onImageSelected(event) {
    this.postImage = <File>event.target.files[0];
  }

  public createPost() {
    const sendRequest = this.postService.sendPost(this.postForm.value.createPostDescription, this.postImage).subscribe(
      response => response,
      err => err);

    const promise = (func) => new Promise((resolve => {
      resolve(func);
    }));

    promise(sendRequest).then(() => this.router.navigate(['']));
  }
}
