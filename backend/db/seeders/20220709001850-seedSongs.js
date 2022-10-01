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
        timesPlayed: 100,
        previewImage: "https://images.squarespace-cdn.com/content/v1/5a8363c74c0dbf8c847b48fe/1593702492307-FNXF3372L3HIU8XNTBGS/beethoven-moonlight-sonata.jpg"
      },
      {
        userId: 2,
        albumId: 1,
        title: 'Canon in D',
        description: 'One of my favorite Classics',
        songUrl: 'https://www.mfiles.co.uk/mp3-downloads/pachelbel-canon-in-d.mp3',
        timesPlayed: 200,
        previewImage: 'https://content.alfred.com/catpics/Big/00-PA02495A_large.jpg'
      },
      {
        userId: 3,
        albumId: 2,
        title: 'The Prayer',
        description: 'A Classic',
        songUrl: 'https://dflocloud.s3.us-west-1.amazonaws.com/01+Days+Before+Rodeo+_+The+Prayer.mp3',
        timesPlayed: 120,
        previewImage: 'https://emptylighthouse-production.s3-us-west-2.amazonaws.com/s3fs-public/styles/696x_amp/public/field/image/Screen%20Shot%202014-12-02%20at%2012.30.18%20PM.jpg'
      },
      {
        userId: 3,
        albumId: 2,
        title: 'Skyfall with Young Thug',
        description: 'Another Banger',
        songUrl: 'https://dflocloud.s3.us-west-1.amazonaws.com/06+Skyfall+(ft.+Young+Thug).mp3',
        timesPlayed: 221,
        previewImage: 'https://i1.sndcdn.com/artworks-000341661411-tvgbu4-t500x500.jpg'
      },
      {
        userId: 1,
        albumId: null,
        title: 'The Blackest Bouqet',
        songUrl: 'https://cdn.pixabay.com/audio/2022/08/31/audio_419263fc12.mp3',
        timesPlayed: 145,
        previewImage: 'https://cdn.pixabay.com/audio/2022/08/31/19-48-37-847_200x200.jpg',
        description: 'Beats for days'
      },
      {
        userId: 2,
        albumId: null,
        title: 'Tuesday',
        songUrl: 'https://cdn.pixabay.com/audio/2022/08/25/audio_4f3b0a816e.mp3',
        timesPlayed: 421,
        previewImage: 'https://cdn.pixabay.com/audio/2022/08/25/21-06-21-240_200x200.png',
        description: 'Glitch Soft Hip-Hop'
      },
      {
        userId: 3,
        albumId: null,
        title: 'Goldn',
        songUrl: 'https://cdn.pixabay.com/audio/2022/08/04/audio_2dde668d05.mp3',
        timesPlayed: 574,
        previewImage: 'https://cdn.pixabay.com/audio/2022/08/05/13-29-08-266_200x200.png',
        description: 'The Lights go out.'
      },
      {
        userId: 1,
        albumId: null,
        title: 'Guitar Electro Sport Trailer',
        songUrl: 'https://cdn.pixabay.com/audio/2022/08/03/audio_54ca0ffa52.mp3',
        timesPlayed: 321,
        previewImage: 'https://cdn.pixabay.com/audio/2022/07/25/05-12-16-975_200x200.png',
        description: 'I mean just listen to this!'
      },
      {
        userId: 2,
        albumId: null,
        title: 'Inspiring Cinematic Ambient',
        songUrl: 'https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3',
        timesPlayed: 325,
        previewImage: 'https://cdn.pixabay.com/audio/2022/08/02/19-23-38-897_200x200.jpg',
        description: 'Something to soothe the soul.'
      },
      {
        userId: 3,
        albumId: null,
        title: 'Lofi Study',
        songUrl: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3',
        timesPlayed: 542,
        previewImage: 'https://cdn.pixabay.com/audio/2022/05/27/23-51-43-941_200x200.jpg',
        description: 'Lets get smarter.'
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/09/17/audio_2eb1acf8b0.mp3",
        timesPlayed: 325,
        previewImage: "https://cdn.pixabay.com/audio/2022/09/17/20-13-39-414_200x200.jpg",
        userId: 1,
        albumId: null,
        title: "Space",
        description: "Haven't felt this good in a while!"
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/04/27/audio_67bcf729cf.mp3",
        timesPlayed: 473,
        previewImage: "https://cdn.pixabay.com/audio/2022/08/12/09-43-51-852_200x200.png",
        userId: 2,
        albumId: null,
        title: "Whip",
        description: "Know who made this?"
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/08/08/audio_0627597b4f.mp3",
        timesPlayed: 574,
        previewImage: "https://cdn.pixabay.com/audio/2022/08/08/09-06-17-761_200x200.jpg",
        userId: 3,
        albumId: null,
        title: "Relaxing Light Background",
        description: "You know some light background music."
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
