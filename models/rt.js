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
          notNull: {
            msg: "Nama RT dibutuhkan!"
          },
          notEmpty: {
            msg: "Nama RT dibutuhkan!"
          },
        },
      },
      link_grup_wa:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Link WhatApp dibutuhkan!"
          },
          notEmpty: {
            msg: "Link WhatApp dibutuhkan!"
          },
        },
      },
      nik_rt:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "NIK RT dibutuhkan!"
          },
          notEmpty: {
            msg: "NIK RT dibutuhkan!"
          },
        },
      },
      rt: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "RT dibutuhkan!"
          },
          notEmpty: {
            msg: "RT dibutuhkan!"
          },
        },
      },
      rw: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "RW dibutuhkan!"
          },
          notEmpty: {
            msg: "RW dibutuhkan!"
          },
        },
      },
      kelurahan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Kelurahan dibutuhkan!"
          },
          notEmpty: {
            msg: "Kelurahan dibutuhkan!"
          },
        },
      },
      kecamatan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Kecamatan dibutuhkan!"
          },
          notEmpty: {
            msg: "Kecamatan dibutuhkan!"
          },
        },
      },
      kotaKabupaten: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Kabupaten/Kota dibutuhkan!"
          },
          notEmpty: {
            msg: "Kabupaten/Kota dibutuhkan!"
          },
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
