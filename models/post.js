"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Rt, {
        foreignKey: "rt_id",
      });

      Post.hasMany(models.Payment, {
        foreignKey: "post_id",
      });
      Post.hasMany(models.Comment, {
        foreignKey: "post_id",
      });
    }
  }
  Post.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: "Nama post dibutuhkan",
          notNull: "Nama post dibutuhkan",
        },
      },
      rt_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: "RT dibutuhkan",
          notNull: "RT dibutuhkan",
        },
      },
      deskripsi: DataTypes.TEXT,
      kategori: DataTypes.ENUM,
      lokasi: DataTypes.STRING,
      biaya: DataTypes.INTEGER,
      dibayar: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
