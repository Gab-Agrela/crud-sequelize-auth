import sequelize, { Model } from "sequelize";

import User from "./User";
import db from ".";

type TOptions = {
  price: number;
  color: string;
};

class Product extends Model {
  declare id: number;
  declare userId: number;
  declare name: string;
  declare brand: string;
  declare model: string;
  declare options: Array<TOptions>;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Product.init(
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    brand: {
      type: sequelize.STRING,
      allowNull: false,
    },
    model: {
      type: sequelize.STRING,
      allowNull: false,
    },
    options: {
      type: sequelize.ARRAY(sequelize.JSONB),
      allowNull: false,
    },
    createdAt: {
      type: sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: sequelize.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "products",
  }
);

User.hasMany(Product, { as: "products", foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });

export default Product;
