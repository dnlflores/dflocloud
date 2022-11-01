'use strict';
const playlistSongs = [...Array(500)].map((playlist, idx) => (
  {
    songId: Math.floor(Math.random() * 30) + 1,
    playlistId: Math.floor(Math.random() * 50) + 1,
    index: idx % 10,
    createdAt: new Date(),
    updatedAt: new Date()
  }
));

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
