import { PostModel } from './post.model';

export class PostsModel {
  page: number;
  per_page: number;
  posts: PostModel[];
  total_pages: number;

  constructor(response: PostsModel) {
    if (response) {
      this.page = response.page;
      this.per_page = response.per_page;
      this.posts = response.posts;
      this.total_pages = response.total_pages;
    }
  }
}
