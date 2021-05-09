'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = bcrypt.hashSync('password', 10)

    await queryInterface.bulkInsert('Users', [{
      name: 'Muhammed Taha Ayan',
      email: 'tahaayan@gmail.com',
      password,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
