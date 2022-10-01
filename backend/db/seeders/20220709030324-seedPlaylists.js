'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Playlists', [
      {
        userId: 1,
        name: "Playlist 1",
        previewImage: "test image for playlist 1",
        timesPlayed: 100
      },
      {
        userId: 2,
        name: "Playlist 2",
        previewImage: "test image for playlist 2",
        timesPlayed: 200
      },
      {
        userId: 3,
        name: "Playlist 3",
        previewImage: "test image for playlist 3",
        timesPlayed: 300
      },
      {
        userId: 1,
        name: "Playlist 4",
        previewImage: "test image for playlist 4",
        timesPlayed: 400
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Playlists', null, {});
  }
};
