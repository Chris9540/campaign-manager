'use strict'

const createService = require('feathers-sequelize')
const createModel = require('../../models/populations.model')
const hooks = require('./populations.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate
  }

  app.use('/populations', createService(options))

  const service = app.service('populations')

  service.hooks(hooks)
}