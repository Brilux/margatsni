import { TagModel } from './tag.model';

export class TagsModel {

  page: number;
  per_page: number;
  total_pages: number;
  tags: TagModel[];

  constructor(response: TagsModel) {
    if (response) {
      this.page = response.page;
      this.per_page = response.per_page;
      this.total_pages = response.total_pages;
      this.tags = response.tags;
    }
  }
}
