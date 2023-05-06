"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Guest, {
        foreignKey: "user_id",
      });
      User.hasMany(models.Vehicle, {
        foreignKey: "user_id",
      });
      User.hasMany(models.Comment, {
        foreignKey: "user_id",
      });
      User.hasMany(models.Payment, {
        foreignKey: "user_id",
      });
      User.hasMany(models.Guest, {
        foreignKey: "user_id",
      });
      User.belongsTo(models.Rt, {
        foreignKey: "rt_id",
      });
    }
  }
  User.init(
    {
      namaLengkap: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: "Nama lengkap dibutuhkan",
          notNull: "Nama lengkap dibutuhkan",
        },
      },
      nomorTelp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: "Nomor Telepon dibutuhkan",
          notNull: "Nomor Telepon dibutuhkan",
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: "Email dibutuhkan",
          notNull: "Email dibutuhkan",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: "Password dibutuhkan",
          notNull: "Password dibutuhkan",
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: "Role dibutuhkan",
          notNull: "Role dibutuhkan",
        },
      },
      nomorKk: DataTypes.STRING,
      nomorKtp: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      rt_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: "RT dibutuhkan",
          notNull: "RT dibutuhkan",
        },
      },
      status_keluarga: {
        type: DataTypes.ENUM,
        values: ["Kepala Keluarga", "Anggota Keluarga"],
        defaultValue: "Kepala Keluarga",
      },
      kkImg: DataTypes.STRING,
      ktpImg: DataTypes.STRING,
      photoUrl: DataTypes.STRING,
      aktaImg: DataTypes.STRING,
      agama: DataTypes.STRING,
      jenis_kelamin: DataTypes.STRING,
      status_perkawinan: DataTypes.STRING,
      pekerjaan: DataTypes.STRING,
      tempat_lahir: DataTypes.STRING,
      tanggal_lahir: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
