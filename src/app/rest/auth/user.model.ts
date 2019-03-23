export class UserModel {
  email: string;
  id: number;
  username: string;

  constructor(response: any) {
    if (response) {
      this.email = response.email;
      this.id = response.id;
      this.username = response.username;
    }
  }
}
