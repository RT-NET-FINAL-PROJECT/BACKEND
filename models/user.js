'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    namaLengkap: DataTypes.STRING,
    nomorTelp: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    nomorKk: DataTypes.STRING,
    nomorKtp: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    rt_id: DataTypes.INTEGER,
    status_keluarga: DataTypes.ENUM,
    kkImg: DataTypes.STRING,
    ktpImg: DataTypes.STRING,
    photoUrl: DataTypes.STRING,
    aktaImg: DataTypes.STRING,
    agama: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
    status_perkawinan: DataTypes.STRING,
    pekerjaan: DataTypes.STRING,
    tempat_lahir: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};