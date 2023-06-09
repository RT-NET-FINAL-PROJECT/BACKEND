"use strict";
const { hashPassword } = require('../helpers/bcrypt')
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
      User.hasMany(models.Service, {
        foreignKey: "user_id",
      });
      User.hasMany(models.Guest, {
        foreignKey: "user_id",
      });
      User.hasOne(models.Submission, {
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
          notEmpty: {msg: "Nama lengkap dibutuhkan"},
          notNull: {msg: "Nama lengkap dibutuhkan"},
        },
      },
      nomorTelp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg : "Nomor Telepon dibutuhkan"},
          notNull: {msg : "Nomor Telepon dibutuhkan"},
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: "Email dibutuhkan"},
          notNull: {msg: "Email dibutuhkan"},
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: "Password dibutuhkan"},
          notNull: {msg: "Password dibutuhkan"},
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
      nomorKtp:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: "NIK dibutuhkan"},
          notNull: {msg: "NIK dibutuhkan"},
        },
      },
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "approved"],
      },
      rt_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {msg: "RT dibutuhkan"},
          notNull: {msg: "RT dibutuhkan"},
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
  User.beforeCreate((user, option) => {
    user.password = hashPassword(user.password)
  });
  return User;
};
