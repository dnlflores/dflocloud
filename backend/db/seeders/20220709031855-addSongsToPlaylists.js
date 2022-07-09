'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('PlaylistSongs', [
      {
        songId: 1,
        playlistId: 1
      },
      {
        songId: 1,
        playlistId: 2
      },
      {
        songId: 1,
        playlistId: 3
      },
      {
        songId: 1,
        playlistId: 4
      },
      {
        songId: 3,
        playlistId: 1
      },
      {
        songId: 3,
        playlistId: 2
      },
      {
        songId: 3,
        playlistId: 3
      },
      {
        songId: 3,
        playlistId: 4
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PlaylistSongs', null, {});
  }
};
