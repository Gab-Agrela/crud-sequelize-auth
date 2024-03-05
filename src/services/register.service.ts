import { ModelStatic } from "sequelize";
import * as bcrypt from "bcrypt";

import User from "../database/models/User";
import resp from "../utils/resp";

class RegisterService {
  private model: ModelStatic<User> = User;

  async createUser(username: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = await this.model.create({
      username,
      email,
      password: hashedPassword,
    });
    return resp(200, users);
  }
}

export default RegisterService;
