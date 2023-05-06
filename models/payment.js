'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {

    static associate(models) {
      // define association here
      Payment.belongsTo(models.User, {
        foreignKey: "user_id"
      })
      Payment.belongsTo(models.Post, {
        foreignKey: "post_id"
      })
    }
  }
  Payment.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: "Data pengguna dibutuhkan",
        notNull: "Data pengguna dibutuhkan"
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: "Data post dibutuhkan",
        notNull: "Data post dibutuhkan"
      }
    },
    nominal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: "Nominal uang dibutuhkan",
        notNull: "Nominal uang dibutuhkan"
      }
    }
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};