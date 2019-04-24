import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from '../../../rest/posts/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  public postImage: File = null;
  public loading: boolean;

  public postForm: FormGroup = new FormGroup({
    createPostDescription: new FormControl(''),
  });

  constructor(private postService: PostService,
              private router: Router) { }

  ngOnInit() {
  }

  public onImageSelected(event) {
    this.postImage = <File>event.target.files[0];
  }

  public createPost() {
    this.loading = true;
      this.postService.sendPost(this.postForm.value.createPostDescription, this.postImage).subscribe(
        () => this.router.navigate(['']),
        err => err);
  }
}
