'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Songs', [
      {
        userId: 2,
        albumId: 1,
        title: 'Beethoven 7th',
        description: 'The classic of course',
        songUrl: 'https://www.mfiles.co.uk/mp3-downloads/beethoven-symphony7-2-liszt-piano.mp3',
        previewImage: "https://images.squarespace-cdn.com/content/v1/5a8363c74c0dbf8c847b48fe/1593702492307-FNXF3372L3HIU8XNTBGS/beethoven-moonlight-sonata.jpg"
      },
      {
        userId: 2,
        albumId: 1,
        title: 'Canon in D',
        description: 'One of my favorite Classics',
        songUrl: 'https://www.mfiles.co.uk/mp3-downloads/pachelbel-canon-in-d.mp3',
        previewImage: 'https://content.alfred.com/catpics/Big/00-PA02495A_large.jpg'
      },
      {
        userId: 3,
        albumId: 2,
        title: 'The Prayer',
        description: 'A Classic',
        songUrl: 'https://dflocloud.s3.us-west-1.amazonaws.com/01+Days+Before+Rodeo+_+The+Prayer.mp3',
        previewImage: 'https://emptylighthouse-production.s3-us-west-2.amazonaws.com/s3fs-public/styles/696x_amp/public/field/image/Screen%20Shot%202014-12-02%20at%2012.30.18%20PM.jpg'
      },
      {
        userId: 3,
        albumId: 2,
        title: 'Skyfall with Young Thug',
        description: 'Another Banger',
        songUrl: 'https://dflocloud.s3.us-west-1.amazonaws.com/06+Skyfall+(ft.+Young+Thug).mp3',
        previewImage: 'https://i1.sndcdn.com/artworks-000341661411-tvgbu4-t500x500.jpg'
      }
     ], {})
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete('Songs', {
      title: { [Op.in]: ['Skyfall with Young Thug', 'The Prayer', 'Canon in D', 'Beethoven 7th'] }
    }, {});
  }
};
