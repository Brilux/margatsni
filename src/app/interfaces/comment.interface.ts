import { UserInterface } from './user.interface';

export interface CommentInterface {
  body: string;
  created_at: string;
  id: number;
  likes_count: number;
  user: UserInterface;
}
