'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Altering email column and adding unique constaint on it.
      @return a promise to correctly handle asynchronicity.
    */
    return queryInterface.addConstraint('users', ['email'], {
      type: 'unique',
      name: 'email_uniqueness_constraint'
    })
  },

  down: function (queryInterface, Sequelize) {
    /*
      Reversing unique constraint.
      @return a promise to correctly handle asynchronicity.
    */
    return queryInterface.removeConstraint('users', 'email_uniqueness_constraint')
  }
}
