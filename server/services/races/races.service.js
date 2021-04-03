'use strict'

const createService = require('feathers-sequelize')
const createModel = require('../../models/races.model')
const hooks = require('./races.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate
  }

  app.use('/races', createService(options))

  const service = app.service('races')

  service.hooks(hooks)
}