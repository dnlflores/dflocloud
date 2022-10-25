'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('PlaylistSongs', [
      {
        songId: 1,
        playlistId: 1
      },
      {
        songId: 2,
        playlistId: 2
      },
      {
        songId: 3,
        playlistId: 3
      },
      {
        songId: 4,
        playlistId: 4
      },
      {
        songId: 5,
        playlistId: 1
      },
      {
        songId: 6,
        playlistId: 2
      },
      {
        songId: 7,
        playlistId: 3
      },
      {
        songId: 8,
        playlistId: 4
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PlaylistSongs', null, {});
  }
};
