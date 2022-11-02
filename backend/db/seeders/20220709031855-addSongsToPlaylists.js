'use strict';
const songIDs = [];
const playlistSongs = [];

while (songIDs.length < 50) {
  const r = Math.floor(Math.random() * 50) + 1;
  if (songIDs.indexOf(r) === -1) songIDs.push(r);
}

let count = 0;
let pID = 1;
for (let i = 0; i < 500; i++) {
  if (count === 10) count = 0;
  count++;

  const data = {
    songId: songIDs[i % 50],
    playlistId: ((count === 10 ? ++pID : pID) % 50) + 1,
    index: count,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  playlistSongs.push(data);
}

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
