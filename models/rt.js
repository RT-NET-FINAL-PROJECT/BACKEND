'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rt.init({
    kepala_rt: DataTypes.STRING,
    rt: DataTypes.STRING,
    rw: DataTypes.STRING,
    kelurahan: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    kotaKabupaten: DataTypes.STRING,
    provinsi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rt',
  });
  return Rt;
};