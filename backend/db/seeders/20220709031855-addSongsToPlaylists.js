'use strict';
const playlistSongs = [...Array(500)].map((playlist, idx) => {

  return {
    songId: (idx % 30) + 1,
    playlistId: (idx % 50) + 1,
    index: idx % 10,
    createdAt: new Date(),
    updatedAt: new Date()
  }
});

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'PlaylistSongs';
    return queryInterface.bulkInsert(options, playlistSongs, {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'PlaylistSongs';
    return queryInterface.bulkDelete(options, null, {});
  }
};
