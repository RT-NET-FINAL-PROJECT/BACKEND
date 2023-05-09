"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rt extends Model {
    static associate(models) {
      // define association here
      Rt.hasMany(models.User, {
        foreignKey: "rt_id",
      });
      Rt.hasMany(models.Service, {
        foreignKey: "rt_id",
      });
      Rt.hasMany(models.Kas, {
        foreignKey: "rt_id",
      });
      Rt.hasMany(models.Post, {
        foreignKey: "rt_id",
      });
      Rt.hasMany(models.Submission, {
        foreignKey: "rt_id",
      });
    }
  }
  Rt.init(
    {
      kepala_rt:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: "Nama RT dibutuhkan",
          notNull: "Nama RT dibutuhkan",
        },
      },
      nik_rt:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: "NIK RT dibutuhkan",
          notNull: "NIK RT dibutuhkan",
        },
      },
      rt: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: "RT dibutuhkan",
          notNull: "RT dibutuhkan",
        },
      },
      rw: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: "RW dibutuhkan",
          notNull: "RW dibutuhkan",
        },
      },
      kelurahan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: "Kelurahan dibutuhkan",
          notNull: "Kelurahan dibutuhkan",
        },
      },
      kecamatan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: "Kecamatan dibutuhkan",
          notNull: "Kecamatan dibutuhkan",
        },
      },
      kotaKabupaten: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: "Kabupaten/Kota dibutuhkan",
          notNull: "Kabupaten/Kota dibutuhkan",
        },
      },
      provinsi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rt",
    }
  );
  return Rt;
};
