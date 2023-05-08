'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaLengkap: {
        type: Sequelize.STRING
      },
      nomorTelp: {
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      nomorKk: {
        type: Sequelize.STRING
      },
      nomorKtp: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM,
        values: ["pending", "in progress", "approved", "done"],
        defaultValue: "pending"
      },
      rt_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Rts",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      status_keluarga: {
        type: Sequelize.ENUM,
        values: [
          "Kepala Keluarga",
          "Anggota Keluarga"
        ],
        defaultValue: "Kepala Keluarga"
      },
      kkImg: {
        type: Sequelize.STRING
      },
      ktpImg: {
        type: Sequelize.STRING
      },
      photoUrl: {
        type: Sequelize.STRING
      },
      aktaImg: {
        type: Sequelize.STRING
      },
      agama: {
        type: Sequelize.STRING
      },
      jenis_kelamin: {
        type: Sequelize.STRING
      },
      status_perkawinan: {
        type: Sequelize.STRING
      },
      pekerjaan: {
        type: Sequelize.STRING
      },
      tempat_lahir: {
        type: Sequelize.STRING
      },
      tanggal_lahir: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};