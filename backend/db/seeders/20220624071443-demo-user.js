'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicUrl: 'https://www.denofgeek.com/wp-content/uploads/2022/01/the-legend-of-zelda-link.jpg'
      },
      {
        email: 'danflo@user.io',
        username: 'DanFlo',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicUrl: 'https://mario.wiki.gallery/images/thumb/b/ba/Sonic_SSBU.png/1200px-Sonic_SSBU.png'

      },
      {
        email: 'travisscott@user.io',
        username: 'TravisScott',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicUrl: 'https://i1.sndcdn.com/avatars-000701366305-hu9f0i-t500x500.jpg'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'DanFlo', 'TravisScott'] }
    }, {});
  }
};