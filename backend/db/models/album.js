'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    static associate(models) {
      Album.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'Artist'
      });

      Album.hasMany(models.Song, {
        foreignKey: 'albumId',
        onDelete: "CASCADE",
        hooks: true
      });
    };
  }

  Album.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      previewImage: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'Album',
    }
  );
  return Album;
};