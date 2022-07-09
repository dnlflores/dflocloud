'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    previewImage: DataTypes.STRING
  }, {});
  Playlist.associate = function(models) {
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
  return Playlist;
};