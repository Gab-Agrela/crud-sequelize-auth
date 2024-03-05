import { ModelStatic } from "sequelize";
import { hash } from "bcrypt";

import User from "../database/models/User";
import resp from "../utils/resp";

class RegisterService {
  private model: ModelStatic<User> = User;

  async createUser(username: string, email: string, password: string) {
    const users = await this.model.create({
      username,
      email,
      password: hash(password, 10),
    });
    return resp(200, users);
  }
}

export default RegisterService;
