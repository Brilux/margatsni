export class StatusModel {
  status: boolean;

  constructor(response: StatusModel) {
    if (response) {
      this.status = response.status;
    }
  }
}
