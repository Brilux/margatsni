export class TagModel {

  id: number;
  name: number;

  constructor(response: TagModel) {
    if (response) {
      this.id = response.id;
      this.name = response.name;
    }
  }
}
