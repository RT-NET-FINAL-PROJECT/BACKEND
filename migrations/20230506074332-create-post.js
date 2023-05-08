"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      rt_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Rts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      deskripsi: {
        type: Sequelize.TEXT,
      },
      kategori: {
        type: Sequelize.ENUM,
        values: ["pengumuman", "event"],
        defaultValue: "pengumuman",
      },
      lokasi: {
        type: Sequelize.STRING,
      },
      biaya: {
        type: Sequelize.INTEGER,
      },
      dibayar: {
        type: Sequelize.BOOLEAN,
      },
      imageUrl: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Posts");
  },
};
