'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    static associate(models) {
      // associations can be defined here
      Playlist.belongsToMany(models.Song, {
        through: "PlaylistSongs",
        foreignKey: "playlistId",
        otherKey: "songId"
      });

      Playlist.belongsTo(models.User, {
        foreignKey: "userId"
      })
    };
  }

  Playlist.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      previewImage: DataTypes.STRING,
      timesPlayed: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'Playlist',
    }
  );
  return Playlist;
};