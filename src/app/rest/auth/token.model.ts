export class TokenModel {
  token: string;
  user: object;

  constructor(response: any) {
    if (response) {
      this.token = response.token;
      this.user = response.user;
    }
  }
}


