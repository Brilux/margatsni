import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  postId: number;

  constructor() { }

  editPost(postId) {
    return this.postId = postId;
  }
}
