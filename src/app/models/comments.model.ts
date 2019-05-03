import { CommentModel } from './comment.model';

export class CommentsModel {
  comments: CommentModel[];
  page: number;
  per_page: number;
  total_pages: number;

  constructor(response: CommentsModel) {
    if (response) {
      this.comments = response.comments;
      this.page = response.page;
      this.per_page = response.per_page;
      this.total_pages = response.total_pages;
    }
  }
}
