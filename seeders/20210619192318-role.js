'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('role', [{
      id: 1,
      name: "user"
    },
    {
      id: 2,
      name: "admin"
    },
    {
      id: 3,
      name: "moderator"
    },
    ]);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('role', null, {});
  }
};
