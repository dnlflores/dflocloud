'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Songs';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        albumId: null,
        title: 'Beethoven 7th',
        description: 'The classic of course',
        songUrl: 'https://www.mfiles.co.uk/mp3-downloads/beethoven-symphony7-2-liszt-piano.mp3',
        timesPlayed: 100,
        previewImage: "https://images.squarespace-cdn.com/content/v1/5a8363c74c0dbf8c847b48fe/1593702492307-FNXF3372L3HIU8XNTBGS/beethoven-moonlight-sonata.jpg"
      },
      {
        userId: 2,
        albumId: null,
        title: 'Canon in D',
        description: 'One of my favorite Classics',
        songUrl: 'https://www.mfiles.co.uk/mp3-downloads/pachelbel-canon-in-d.mp3',
        timesPlayed: 200,
        previewImage: 'https://content.alfred.com/catpics/Big/00-PA02495A_large.jpg'
      },
      {
        userId: 3,
        albumId: null,
        title: 'Caves of Dawn',
        description: 'Try to fall asleep...',
        songUrl: 'https://cdn.pixabay.com/audio/2021/11/05/audio_b66e48cda5.mp3',
        timesPlayed: 120,
        previewImage: 'https://cdn.pixabay.com/audio/2022/09/28/18-56-18-535_200x200.jpg'
      },
      {
        userId: 4,
        albumId: null,
        title: 'Sinister Night',
        description: 'Come creep to the beat...',
        songUrl: 'https://cdn.pixabay.com/audio/2022/09/28/audio_f1974c5c4f.mp3',
        timesPlayed: 221,
        previewImage: 'https://i1.sndcdn.com/artworks-000341661411-tvgbu4-t500x500.jpg'
      },
      {
        userId: 5,
        albumId: null,
        title: 'The Blackest Bouqet',
        songUrl: 'https://cdn.pixabay.com/audio/2022/08/31/audio_419263fc12.mp3',
        timesPlayed: 145,
        previewImage: 'https://cdn.pixabay.com/audio/2022/08/31/19-48-37-847_200x200.jpg',
        description: 'Beats for days'
      },
      {
        userId: 6,
        albumId: null,
        title: 'Tuesday',
        songUrl: 'https://cdn.pixabay.com/audio/2022/08/25/audio_4f3b0a816e.mp3',
        timesPlayed: 421,
        previewImage: 'https://cdn.pixabay.com/audio/2022/08/25/21-06-21-240_200x200.png',
        description: 'Glitch Soft Hip-Hop'
      },
      {
        userId: 7,
        albumId: null,
        title: 'Goldn',
        songUrl: 'https://cdn.pixabay.com/audio/2022/08/04/audio_2dde668d05.mp3',
        timesPlayed: 574,
        previewImage: 'https://cdn.pixabay.com/audio/2022/08/05/13-29-08-266_200x200.png',
        description: 'The Lights go out.'
      },
      {
        userId: 8,
        albumId: null,
        title: 'Guitar Electro Sport Trailer',
        songUrl: 'https://cdn.pixabay.com/audio/2022/08/03/audio_54ca0ffa52.mp3',
        timesPlayed: 321,
        previewImage: 'https://cdn.pixabay.com/audio/2022/07/25/05-12-16-975_200x200.png',
        description: 'I mean just listen to this!'
      },
      {
        userId: 9,
        albumId: null,
        title: 'Inspiring Cinematic Ambient',
        songUrl: 'https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3',
        timesPlayed: 325,
        previewImage: 'https://cdn.pixabay.com/audio/2022/08/02/19-23-38-897_200x200.jpg',
        description: 'Something to soothe the soul.'
      },
      {
        userId: 10,
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
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/08/30/audio_4f0acae3d3.mp3",
        timesPlayed: 234,
        previewImage: "https://cdn.pixabay.com/audio/2022/08/30/07-32-22-321_200x200.jpg",
        userId: 4,
        albumId: null,
        title: "Dark Ambient",
        description: "You know some dark background music."
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/10/07/audio_94333066a7.mp3",
        timesPlayed: 123,
        previewImage: "https://developer-assets.ws.sonos.com/doc-assets/portalDocs-sonosApp-defaultArtAlone.png",
        userId: 6,
        albumId: null,
        title: "Let the Mystery Unfold",
        description: "Let's explore this mystery together."
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/10/25/audio_ecba0c58a1.mp3",
        timesPlayed: 486,
        previewImage: "https://cdn.pixabay.com/audio/2022/08/30/07-32-22-321_200x200.jpg",
        userId: 5,
        albumId: null,
        title: "Stranger Things",
        description: "I admit it, this is sort of strange."
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/03/23/audio_07b2a04be3.mp3",
        timesPlayed: 378,
        previewImage: "https://developer-assets.ws.sonos.com/doc-assets/portalDocs-sonosApp-defaultArtAlone.png",
        userId: 7,
        albumId: null,
        title: "Order",
        description: "This is totally a vibe."
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/06/28/audio_ffe4e508f3.mp3",
        timesPlayed: 265,
        previewImage: "https://cdn.pixabay.com/audio/2022/06/27/12-00-45-604_200x200.jpg",
        userId: 8,
        albumId: null,
        title: "Bounce",
        description: "If you need some uplifting tunes, this one is for you."
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/10/21/audio_67f950f9ad.mp3",
        timesPlayed: 847,
        previewImage: "https://cdn.pixabay.com/audio/2022/10/21/11-00-08-199_200x200.jpg",
        userId: 9,
        albumId: null,
        title: "In the Now",
        description: "Live life in the now."
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/03/10/audio_b195486a22.mp3",
        timesPlayed: 756,
        previewImage: "https://cdn.pixabay.com/audio/2022/04/19/14-43-14-304_200x200.png",
        userId: 10,
        albumId: null,
        title: "Price of Freedom",
        description: "How much would you pay for your freedom?"
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/05/23/audio_e341a2c57a.mp3",
        timesPlayed: 221,
        previewImage: "https://cdn.pixabay.com/audio/2022/05/23/16-24-30-549_200x200.png",
        userId: 1,
        albumId: null,
        title: "The Podcast Intro",
        description: "Do you need a tune to start your podcast? We got you fam."
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/10/02/audio_c216ad4a20.mp3",
        timesPlayed: 333,
        previewImage: "https://cdn.pixabay.com/audio/2022/10/02/09-06-35-178_200x200.jpg",
        userId: 2,
        albumId: null,
        title: "Summer Nights",
        description: "There is no night like a summer night."
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/09/18/audio_5658d27863.mp3",
        timesPlayed: 562,
        previewImage: "https://cdn.pixabay.com/audio/2022/09/18/16-52-08-594_200x200.jpg",
        userId: 3,
        albumId: null,
        title: "Playing in Color",
        description: "Stop playing in black and white and start adding some color to your fun!"
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/10/02/audio_8f97a56643.mp3",
        timesPlayed: 451,
        previewImage: "https://cdn.pixabay.com/audio/2022/10/02/06-29-09-949_200x200.jpg",
        userId: 4,
        albumId: null,
        title: "Sweet Love",
        description: "Beat as sweet as donuts!"
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/10/12/audio_2eca99b967.mp3",
        timesPlayed: 625,
        previewImage: "https://cdn.pixabay.com/audio/2022/10/12/10-43-43-53_200x200.jpg",
        userId: 5,
        albumId: null,
        title: "Happy Acousitc Guitar Background Music",
        description: "Yes I know it is a very creative title. But I like to get straight to the point sometimes."
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/06/25/audio_944aab53cf.mp3",
        timesPlayed: 298,
        previewImage: "https://cdn.pixabay.com/audio/2022/06/25/14-55-33-454_200x200.jpg",
        userId: 6,
        albumId: null,
        title: "Epicaly",
        description: "This song is totally epic."
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/10/13/audio_f917a5a4fc.mp3",
        timesPlayed: 111,
        previewImage: "https://cdn.pixabay.com/audio/2022/10/13/14-08-05-304_200x200.jpg",
        userId: 7,
        albumId: null,
        title: "The Best Adventure Ever",
        description: "Are you ready for the best adventure ever?"
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/01/26/audio_d0c6ff1bdd.mp3",
        timesPlayed: 314,
        previewImage: "https://cdn.pixabay.com/audio/2022/04/06/06-57-42-712_200x200.png",
        userId: 8,
        albumId: null,
        title: "The Cradle of Your Soul",
        description: "If your soul is in need of some love, this song is for you."
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/06/27/audio_896b171c42.mp3",
        timesPlayed: 412,
        previewImage: "https://cdn.pixabay.com/audio/2022/06/27/11-37-49-556_200x200.png",
        userId: 9,
        albumId: null,
        title: "Epic Cinematic Trailer",
        description: "If you want to add some epicness to your life, this is the song for you."
      },
      {
        songUrl: "https://cdn.pixabay.com/audio/2022/09/22/audio_14e9964c5f.mp3",
        timesPlayed: 811,
        previewImage: "https://cdn.pixabay.com/audio/2022/09/24/09-19-03-222_200x200.jpeg",
        userId: 10,
        albumId: null,
        title: "Blessed",
        description: "Blessed by Daddy's music."
      }
     ], {})
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Songs';
    return queryInterface.bulkDelete(options, null, {});
  }
};
