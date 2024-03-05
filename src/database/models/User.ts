import sequelize, { Model } from "sequelize";
import db from ".";

class User extends Model {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "users",
    timestamps: false,
  }
);

export default User;
