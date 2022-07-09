'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
