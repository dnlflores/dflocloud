'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    previewImage: DataTypes.STRING
  },
  {
    scopes: {
      song: {
        attributes: { exclude: ['userId', 'description', 'updatedAt', 'createdAt'] }
      }
    }
  });
  Album.associate = function(models) {
    // associations can be defined here
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
  return Album;
};