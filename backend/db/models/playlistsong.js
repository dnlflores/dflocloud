'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlaylistSong = sequelize.define('PlaylistSong', {
    songId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER
  }, {});
  PlaylistSong.associate = function(models) {
    // associations can be defined her
  };
  return PlaylistSong;
};