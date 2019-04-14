import { CommentInterface } from './comment.interface';
import { UserInterface } from './user.interface';

export interface PostInterface {
  body: string;
  comments: CommentInterface[];
  create_at: string;
  id: number;
  image: string;
  likes_count: number;
  user: UserInterface;
}

