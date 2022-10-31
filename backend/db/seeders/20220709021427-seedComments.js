'use strict';
const { faker } = require('@faker-js/faker');
const comments = [...Array(100)].map((comment, idx) => (
  {
    userId: Math.floor(Math.random() * 10) + 1,
    content: faker.lorem.sentences(2),
    songId: Math.floor(Math.random() * 30) + 1,
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
    options.tableName = 'Comments';
    return queryInterface.bulkInsert(options, comments, {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Comments';
    return queryInterface.bulkDelete(options, null, {});
  }
};
