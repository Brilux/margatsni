import { UserInterface } from '../../interfaces/user.interface';

export class UserModel implements UserInterface {
  bio: string;
  email: string;
  id: number;
  username: string;

  constructor(response: UserModel) {
    if (response) {
      this.bio = response.bio;
      this.email = response.email;
      this.id = response.id;
      this.username = response.username;
    }
  }
}
