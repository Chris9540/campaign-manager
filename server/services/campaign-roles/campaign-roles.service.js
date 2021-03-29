'use strict'

const createService = require('feathers-sequelize')
const createModel = require('../../models/campaign-roles.model')
const hooks = require('./campaign-roles.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate
  }

  app.use('/campaign-roles', createService(options))

  const service = app.service('campaign-roles')

  service.hooks(hooks)
}