import { UserModel } from '../rest/auth/user.model';

export class UserSearchModel {
  page: number;
  per_page: number;
  total_pages: number;
  users: UserModel[];

  constructor(response: UserSearchModel) {
    if (response) {
      this.page = response.page;
      this.per_page = response.per_page;
      this.total_pages = response.total_pages;
      this.users = response.users;
    }
  }
}
