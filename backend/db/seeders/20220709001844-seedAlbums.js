'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Albums', [
      {
        userId: 2,
        title: 'Pikachu in the Trap',
        description: 'My first album!',
        previewImage: 'https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg'
      },
      {
        userId: 3,
        title: 'Days Before Rodeo',
        description: 'Travis Scott mixtape',
        previewImage: 'https://i.pinimg.com/736x/30/e6/70/30e670596401471f0b3410f8c1ff1ea5.jpg'
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete('Albums', {
      title: { [Op.in]: ['Daniel in the Trap', 'Days Before Rodeo'] }
    }, {});
  }
};
