import { ModelStatic } from "sequelize";

import User from "../database/models/User";
import resp from "../utils/resp";

class UserService {
  private model: ModelStatic<User> = User;

  async getByUsername(username: string) {
    const user = await this.model.findOne({ where: { username } });
    if (!user) throw new Error("User not found");
    return resp(200, user);
  }

  async getByEmail(email: string) {
    const user = await this.model.findOne({ where: { email } });
    if (!user) throw new Error("User not found");
    return resp(200, user);
  }
}

export default UserService;
