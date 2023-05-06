'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehicle.belongsTo(models.User, {
        foreignKey: "user_id"
      })
    }
  }
  Vehicle.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: "Nama kendaraan dibutuhkan",
        notNull: "Nama kendaraan dibutuhkan"
      }
    },
    nomorPolisi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: "Nomor plat kendaraan dibutuhkan",
        notNull: "Nomor plat kendaraan dibutuhkan"
      }
    },
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vehicle',
  });
  return Vehicle;
};