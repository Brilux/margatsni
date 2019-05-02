import { UserModel } from '../rest/auth/user.model';

export class CommentModel {
  comment?: CommentModel;

  body: string;
  created_at: string;
  id: number;
  liked: boolean;
  likes_count: number;
  user: UserModel;

  toggleForEdit?: boolean;

  constructor(response: CommentModel) {
    if (response) {
      this.comment = response.comment;

      this.body = response.body;
      this.created_at = response.created_at;
      this.id = response.id;
      this.liked = response.liked;
      this.likes_count = response.likes_count;
      this.user = response.user;
    }
  }
}
