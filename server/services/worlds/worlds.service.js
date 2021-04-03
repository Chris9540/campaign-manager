'use strict'

const createService = require('feathers-sequelize')
const createModel = require('../../models/worlds.model')
const hooks = require('./worlds.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate
  }

  app.use('/worlds', createService(options))

  const service = app.service('worlds')

  service.hooks(hooks)
}