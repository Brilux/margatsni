import { UserModel } from '../rest/auth/user.model';
import { CommentModel } from './comment.model';

export class PostModel {
  post?: PostModel;

  body: string;
  comments: CommentModel[];
  created_at: string;
  id: number;
  image: string;
  liked: boolean;
  likes_count: number;
  user: UserModel;

  constructor(response: PostModel) {
    if (response) {
      this.post = response.post;

      this.body = response.body;
      this.comments = response.comments;
      this.created_at = response.created_at;
      this.id = response.id;
      this.image = response.image;
      this.liked = response.liked;
      this.likes_count = response.likes_count;
      this.user = response.user;
    }
  }
}
