import { UserModel } from './user.model';

export class TokenModel {
  token: string;
  user: UserModel;

  constructor(response: TokenModel) {
    if (response) {
      this.token = response.token;
      this.user = response.user;
    }
  }
}


