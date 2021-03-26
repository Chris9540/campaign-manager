
'use strict'

const Sequelize = require('sequelize')

module.exports = function (app) {
  const oldSetup = app.setup

  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/database.sqlite',
    query: {
      raw: true
    },
    define: {
      freezeTableName: true,
      underscored: true,
      createdAt: false,
      updatedAt: false
    }
  })

  /**
   * @param {String} sql
   * @param {Object} options
   * @description This method allows us to bypass most of the sequelize methods
   * for the front end data requests, since we want to keep it easy to maintain,
   * this will allow us to make easy raw SQL requests from the middleware or
   * route handlers.
   */
  const fetch = async (sql, options) => {
    const result = await sequelize.queryInterface.sequelize.query(
      ...[sql, options]
    )
    return result
  }

  // add to app
  app.set('sequelizeClient', sequelize)
  app.set('fetch', fetch)
  // associate models
  app.setup = function (...args) {
    const result = oldSetup.apply(this, args)
    const models = sequelize.models
    Object.keys(models).forEach((name) => {
      if ('associate' in models[name]) {
        models[name].associate(models)
      }
    })
    sequelize.sync()
    return result
  }// end app.setup
}
