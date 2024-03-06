import sequelize, { Model } from "sequelize";
import db from ".";

type TOptions = {
  price: number;
  color: string;
};

class Product extends Model {
  declare id: number;
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
    name: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    brand: {
      type: sequelize.STRING,
      allowNull: false,
    },
    model: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
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

export default Product;
