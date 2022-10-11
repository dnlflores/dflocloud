'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    previewImage: DataTypes.STRING,
    timesPlayed: DataTypes.INTEGER
  }, {});
  Playlist.associate = function(models) {
    // associations can be defined here
    Playlist.belongsToMany(models.Song, {
      through: "PlaylistSongs",
      foreignKey: "playlistId",
      otherKey: "songId"
    });

    // Playlist.hasMany(models.PlaylistSong, {
    //   foreignKey: 'playlistId',
    //   onDelete: "CASCADE",
    //   hooks: true
    // })

    Playlist.belongsTo(models.User, {
      foreignKey: "userId"
    })
  };
  return Playlist;
};