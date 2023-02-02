'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicUrl: 'https://play-lh.googleusercontent.com/5LIMaa7WTNy34bzdFhBETa2MRj7mFJZWb8gCn_uyxQkUvFx_uOFCeQjcK16c6WpBA3E'
      },
      {
        email: 'danflo@user.io',
        username: 'DanFlo',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicUrl: 'https://mario.wiki.gallery/images/thumb/b/ba/Sonic_SSBU.png/1200px-Sonic_SSBU.png'

      },
      {
        email: 'link@user.io',
        username: 'Link',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicUrl: 'https://c4.wallpaperflare.com/wallpaper/567/26/390/zelda-the-legend-of-zelda-twilight-princess-link-the-legend-of-zelda-twilight-princess-wallpaper-preview.jpg'
      },
      {
        email: 'scream@user.io',
        username: 'Ghostface',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicUrl: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2021/10/Scream-5-Ghostface.jpg'
      },
      {
        email: 'jack@user.io',
        username: 'JackoLantern',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicUrl: 'https://eckerts.com/app/uploads/2021/08/Jack-o-27-Lantern-300x2661-2.jpg'
      },
      {
        email: 'pooh@user.io',
        username: 'WinnieThePooh',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicUrl: 'https://hips.hearstapps.com/seventeen/assets/15/45/1446824821-12038569-10153015444511237-8218060226590962793-o.jpg'
      },
      {
        email: 'supes@user.io',
        username: 'Superman',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicUrl: 'https://cdn.vox-cdn.com/thumbor/Fn7zTVyhkETnUA-mGk-k50ovTj8=/181x648:2802x2020/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/22930990/Superman_New_Mission_Statement.jpg'
      },
      {
        email: 'vader@user.io',
        username: 'DarthVader',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicUrl: 'https://wegotthiscovered.com/wp-content/uploads/2022/07/image1-49.jpg'
      },
      {
        email: 'walter@user.io',
        username: 'Heisenberg',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicUrl: 'https://upload.wikimedia.org/wikipedia/en/0/03/Walter_White_S5B.png'
      },
      {
        email: 'peter@user.io',
        username: 'Spiderman',
        hashedPassword: bcrypt.hashSync('password'),
        profilePicUrl: 'https://cdn.mos.cms.futurecdn.net/AyTvGrENuFqBLDqGhZiXDc.jpg'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, null, {});
  }
};