"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("transactions", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         idProduct: {
            type: Sequelize.INTEGER,
         },
         idBuyer: {
            type: Sequelize.INTEGER,
         },
         idSeller: {
            type: Sequelize.INTEGER,
         },
         total: {
            type: Sequelize.INTEGER,
         },
         status: {
            type: Sequelize.STRING,
         },
         shipping: {
            type: Sequelize.INTEGER,
         },
         discount: {
            type: Sequelize.INTEGER,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("transactions");
   },
};
