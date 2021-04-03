'use strict'

const createService = require('feathers-sequelize')
const createModel = require('../../models/burgs.model')
const hooks = require('./burgs.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate
  }

  app.use('/burgs', createService(options))

  const service = app.service('burgs')

  service.hooks(hooks)
}