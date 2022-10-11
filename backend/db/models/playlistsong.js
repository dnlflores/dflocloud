'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlaylistSong = sequelize.define('PlaylistSong', {
    songId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER
  }, {
    scopes: {
      playlist: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      }
    }
  });
  PlaylistSong.associate = function(models) {
    // associations can be defined her
    // PlaylistSong.hasMany(models.Playlist, {
    //   foreignKey: 'playlistId',
    //   onDelete: 'cascade',
    //   hooks: true
    // })
  };
  return PlaylistSong;
};