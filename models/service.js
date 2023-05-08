"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      // define association here
      Service.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Service.belongsTo(models.Rt, {
        foreignKey: "rt_id",
      });
      Service.hasMany(models.Submission, {
        foreignKey: "service_id",
      })
    }
  }
  Service.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: "Nama layanan dibutuhkan",
          notNull: "Nama layanan dibutuhkan",
        },
      },
      rt_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: "RT dibutuhkan",
          notNull: "RT dibutuhkan",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: "Data pengguna dibutuhkan",
          notNull: "Data pengguna dibutuhkan",
        },
      },
      deskripsi: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Service",
    }
  );
  return Service;
};