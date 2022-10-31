'use strict';
const { faker } = require('@faker-js/faker');
const playlists = [...Array(50)].map((playlist, idx) => (
  {
    userId: Math.floor(Math.random() * 10) + 1,
    name: faker.music.songName(),
    description: faker.lorem.sentences(),
    previewImage: faker.image.abstract(500, 500, true),
    timesPlayed: Math.floor(Math.random() * 1000),
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
    options.tableName = 'Playlists';
    return queryInterface.bulkInsert(options, playlists, {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Playlists';
    return queryInterface.bulkDelete(options, null, {});
  }
};
