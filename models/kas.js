'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Kas.init({
    rt_id: DataTypes.INTEGER,
    nominal: DataTypes.INTEGER,
    alur: DataTypes.ENUM,
    deskripsi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kas',
  });
  return Kas;
};