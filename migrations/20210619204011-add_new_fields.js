'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'user', // table name
        'setting', // new field name
        {
          type: Sequelize.JSON,
          allowNull: true,
        },
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([  // to remove 
      queryInterface.removeColumn('user', 'setting'), //
    ]);
  }
};
