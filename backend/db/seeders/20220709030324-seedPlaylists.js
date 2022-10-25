'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Playlists';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        name: "Playlist 1",
        previewImage: "https://thumbs.dreamstime.com/b/dynamic-radial-color-sound-equalizer-design-music-album-cover-template-abstract-circular-digital-data-form-vector-160916775.jpg",
        timesPlayed: 100,
        description: "This is the first playlist"
      },
      {
        userId: 2,
        name: "Playlist 2",
        previewImage: "https://media.npr.org/assets/img/2013/04/22/dark-side_sq-1da3a0a7b934f431c175c91396a1606b3adf5c83-s1100-c50.jpg",
        timesPlayed: 200,
        description: "this is the second playlist"
      },
      {
        userId: 3,
        name: "Playlist 3",
        previewImage: "https://images.squarespace-cdn.com/content/v1/53b6eb62e4b06e0feb2d8e86/1607362705516-R5Q22H4FVIVPNMW8OWD7/SamSpratt_KidCudi_ManOnTheMoon3_AlbumCover_Web.jpg",
        timesPlayed: 300,
        description: "this is the third playlist"
      },
      {
        userId: 1,
        name: "Playlist 4",
        previewImage: "https://i.pinimg.com/736x/cc/da/c8/ccdac86510cc878172542c1fe100e8c7.jpg",
        timesPlayed: 400,
        description: "this is the fourth playlist"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Playlists';
    return queryInterface.bulkDelete(options, null, {});
  }
};
