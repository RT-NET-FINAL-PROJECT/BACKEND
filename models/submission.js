"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    static associate(models) {
      // define association here
      Submission.belongsTo(models.User, {
        foreignKey: "user_id",
      });

      Submission.belongsTo(models.Rt, {
        foreignKey: "rt_id",
      });

      Submission.belongsTo(models.Service, {
        foreignKey: "service_id",
      });
    }
  }
  Submission.init(
    {
      user_id: DataTypes.INTEGER,
      rt_id: DataTypes.INTEGER,
      service_id: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "in progress", "approved", "done"],
      },
      keterangan: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Submission",
    }
  );
  return Submission;
};