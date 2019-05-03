import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  public postIdForEdit: number;
  public postIdForReview: number;

  constructor() { }

  public editPost(postId): number {
    return this.postIdForEdit = postId;
  }

  public postReview(postId): number {
    return this.postIdForReview = postId;
  }
}
