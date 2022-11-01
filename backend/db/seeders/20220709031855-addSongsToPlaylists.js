'use strict';
const songIDs = [];
const playlistIDs = [];

while(songIDs.length < 30){
    const r = Math.floor(Math.random() * 30) + 1;
    if(songIDs.indexOf(r) === -1) songIDs.push(r);
}

while(playlistIDs.length < 50){
  const r = Math.floor(Math.random() * 50) + 1;
  if(playlistIDs.indexOf(r) === -1) playlistIDs.push(r);
}

const playlistSongs = [...Array(500)].map((playlist, idx) => {

  return {
    songId: songIDs[idx % 30],
    playlistId: playlistIDs[idx % 50],
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
