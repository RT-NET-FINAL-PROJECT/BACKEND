'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kas extends Model {
    static associate(models) {
      // define association here
      Kas.belongsTo(models.Rt, {
        foreignKey: "rt_id"
      })
    }
  }
  Kas.init({
    rt_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: "RT dibutuhkan",
        notNull: "RT dibutuhkan"
      }
    },
    nominal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: "Nominal dana dibutuhkan",
        notNull: "Nominal dana dibutuhkan"
      }
    },
    alur: DataTypes.ENUM,
    deskripsi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kas',
  });
  return Kas;
};