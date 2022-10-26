'use strict';
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PlaylistSong extends Model {
    static associate(models) {
      // associations can be defined here
    };
  }

  PlaylistSong.init(
    {
      songId: DataTypes.INTEGER,
      playlistId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'PlaylistSong',
      scopes: {
        playlist: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      }
    }
  );
  return PlaylistSong;
};