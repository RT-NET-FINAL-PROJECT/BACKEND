'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let dataUsers = require("../data.json").Posts
    dataUsers.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Posts', dataUsers);//param 1 nama tablenya
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
