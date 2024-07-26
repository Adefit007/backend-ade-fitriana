"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class customer extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
   }
   customer.init(
      {
         name: DataTypes.STRING,
         email: DataTypes.STRING,
         password: DataTypes.STRING,
         status: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "customer",
      }
   );
   return customer;
};
