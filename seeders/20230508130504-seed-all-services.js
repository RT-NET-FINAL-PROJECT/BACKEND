'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let dataUsers = require("../data.json").Services
    dataUsers.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Services', dataUsers);//param 1 nama tablenya
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Services', null, {});
  }
};
