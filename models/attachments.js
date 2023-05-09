"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attachment extends Model {
    static associate(models) {
      // define association here
      Attachment.belongsTo(models.Submission, {
        foreignKey: "submission_id",
      });
    }
  }
  Attachment.init(
    {
      attachUrl: DataTypes.STRING,
      submission_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Attachment",
    }
  );
  return Attachment;
};