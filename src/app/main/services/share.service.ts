import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  postIdForEdit: number;
  postIdForReview: number;

  constructor() { }

  public editPost(postId) {
    return this.postIdForEdit = postId;
  }

  public postReview(postId) {
    return this.postIdForReview = postId;
  }
}
