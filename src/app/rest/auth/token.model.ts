import { UserInterface } from '../../interfaces/user.interface';

export class TokenModel {
  token: string;
  user: UserInterface;

  constructor(response: TokenModel) {
    if (response) {
      this.token = response.token;
      this.user = response.user;
    }
  }
}


