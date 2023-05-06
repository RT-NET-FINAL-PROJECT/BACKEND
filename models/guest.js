'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    static associate(models) {
      // define association here
      Guest.belongsTo(models.User, {
        foreignKey: "user_id"
      })
    }
  }
  Guest.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: "Nama dibutuhkan",
        notNull: "Nama dibutuhkan"
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nomorKtp: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: "Nomor KTP dibutuhkan",
        notNull: "Nomor KTP dibutuhkan"
      }
    }
  }, {
    sequelize,
    modelName: 'Guest',
  });
  return Guest;
};