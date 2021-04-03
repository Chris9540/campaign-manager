'use strict'

const createService = require('feathers-sequelize')
const createModel = require('../../models/kingdoms.model')
const hooks = require('./kingdoms.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate
  }

  app.use('/kingdoms', createService(options))

  const service = app.service('kingdoms')

  service.hooks(hooks)
}