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
          notEmpty: {msg: "Nama layanan dibutuhkan"},
          notNull: {msg: "Nama layanan dibutuhkan"},
        },
      },
      dokumen_pendukung: DataTypes.STRING,
      rt_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {msg: "RT dibutuhkan"},
          notNull: {msg: "RT dibutuhkan"},
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {msg: "Data pengguna dibutuhkan"},
          notNull: {msg: "Data pengguna dibutuhkan"},
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