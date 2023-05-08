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
      kepala_rt: DataTypes.STRING,
      nik_rt:DataTypes.STRING,
      rt: DataTypes.STRING,
      rw: DataTypes.STRING,
      kelurahan: DataTypes.STRING,
      kecamatan: DataTypes.STRING,
      kecamatan: DataTypes.STRING,
      kotaKabupaten: DataTypes.STRING,
      provinsi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rt",
    }
  );
  return Rt;
};
