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

  public imgURL: any;
  public errorMessage: string;

  public postForm: FormGroup = new FormGroup({
    createPostDescription: new FormControl(''),
  });

  constructor(private postService: PostService,
              private router: Router) {
  }

  ngOnInit() {
  }

  public onImageSelected(event, files) {
    if (files[0].type.match(/image\/*/) == null) {
      this.errorMessage = 'Only images are supported.';
      return;
    } else {
      this.errorMessage = '';
      this.postImage = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.imgURL = reader.result;
      };
    }
  }

  public createPost() {
    this.loading = true;
    this.postService.sendPost(this.postForm.value.createPostDescription, this.postImage).subscribe(
      () => this.router.navigate(['']),
      err => err);
  }
}
