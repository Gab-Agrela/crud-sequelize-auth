import { ModelStatic } from "sequelize";

import User from "../database/models/User";
import resp from "../utils/resp";

class AccountService {
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

  async usernameAlreadyExist(username: string) {
    const user = await this.model.findOne({ where: { username } });
    if (user) throw new Error("Username already registered");
    return;
  }

  async emailAlreadyExist(email: string) {
    const user = await this.model.findOne({ where: { email } });
    if (user) throw new Error("Email already registered");
    return;
  }
}

export default AccountService;
