import axios from "axios";

export class Communicator {
  private userServiceUrl: string;
  constructor() {
    this.userServiceUrl =
      process.env.USER_SERVICE_URL || "http://user-service:8080";
  }

  async getUser(id: number) {
    const response = await axios.get(`${this.userServiceUrl}/api/users/${id}`);
    return response.data;
  }
}
