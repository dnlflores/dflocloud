'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    songUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});

  Song.associate = function (models) {
    Song.belongsTo(models.User, {
      foreignKey: 'userId'
    });

    Song.hasMany(models.Comment, {
      foreignKey: 'songId'
    });
  };
  
  return Song;
};