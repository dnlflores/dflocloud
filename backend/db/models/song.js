'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    static associate(models) {
      Song.Artist = Song.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'Artist'
      });

      Song.hasMany(models.Comment, {
        foreignKey: 'songId',
        onDelete: "CASCADE",
        hooks: true
      });

      Song.belongsTo(models.Album, {
        foreignKey: "albumId"
      });

      Song.belongsToMany(models.Playlist, {
        through: "PlaylistSongs",
        foreignKey: "songId",
        otherKey: "playlistId"
      });
    }
  };


  Song.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      songUrl: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      previewImage: DataTypes.STRING,
      timesPlayed: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'Song',
    }
  );

  return Song;
};