'use strict'

module.exports = {
  /*
    Add commands to create users table.
    @return a promise to correctly handle asynchronicity.
  */
  up: (queryInterface, Sequelize) => {
    const schema = {
      'id': {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      'email': Sequelize.STRING,
      'password': Sequelize.STRING,
      'avatarUrl': Sequelize.STRING,
      'createdAt': Sequelize.DATE,
      'updatedAt': Sequelize.DATE
    }

    return queryInterface.createTable('users', schema)
  },

  /*
    Add commands to drop users table.
    @return a promise to correctly handle asynchronicity.
  */
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
}
