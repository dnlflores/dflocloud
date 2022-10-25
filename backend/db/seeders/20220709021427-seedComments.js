'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Comments';
    return queryInterface.bulkInsert(options, [
    {
      songId: 1,
      content: "This song is alright",
      userId: 1
    },
    {
      songId: 2,
      content: "This song is the bomb.com",
      userId: 3
    },
    {
      songId: 3,
      content: "This song is okay at best",
      userId: 1
    },
    {
      songId: 4,
      content: "This song is the bomb diggity",
      userId: 2
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Comments';
    return queryInterface.bulkDelete(options, null, {});
  }
};
