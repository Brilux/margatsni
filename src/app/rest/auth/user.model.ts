export class UserModel {
  user?: UserModel;

  bio: string;
  email: string;
  id: number;
  image: string;
  username: string;

  constructor(response: UserModel) {
    if (response) {
      this.user = response.user;

      this.bio = response.bio;
      this.email = response.email;
      this.id = response.id;
      this.image = response.image;
      this.username = response.username;
    }
  }
}
