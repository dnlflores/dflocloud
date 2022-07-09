'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    songUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    previewImage: DataTypes.STRING
  }, {});

  Song.associate = function (models) {
    Song.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'Artist'
    });

    Song.hasMany(models.Comment, {
      foreignKey: 'songId'
    });

    Song.belongsTo(models.Album, {
      foreignKey: "albumId"
    });

    Song.belongsToMany(models.Playlist, {
      through: "PlaylistSongs",
      foreignKey: "songId",
      otherKey: "playlistId"
    });
  };
  
  return Song;
};