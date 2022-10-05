'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Playlists', [
      {
        userId: 1,
        name: "Playlist 1",
        previewImage: "https://thumbs.dreamstime.com/b/dynamic-radial-color-sound-equalizer-design-music-album-cover-template-abstract-circular-digital-data-form-vector-160916775.jpg",
        timesPlayed: 100
      },
      {
        userId: 2,
        name: "Playlist 2",
        previewImage: "https://media.npr.org/assets/img/2013/04/22/dark-side_sq-1da3a0a7b934f431c175c91396a1606b3adf5c83-s1100-c50.jpg",
        timesPlayed: 200
      },
      {
        userId: 3,
        name: "Playlist 3",
        previewImage: "https://images.squarespace-cdn.com/content/v1/53b6eb62e4b06e0feb2d8e86/1607362705516-R5Q22H4FVIVPNMW8OWD7/SamSpratt_KidCudi_ManOnTheMoon3_AlbumCover_Web.jpg",
        timesPlayed: 300
      },
      {
        userId: 1,
        name: "Playlist 4",
        previewImage: "https://i.pinimg.com/736x/cc/da/c8/ccdac86510cc878172542c1fe100e8c7.jpg",
        timesPlayed: 400
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Playlists', null, {});
  }
};
