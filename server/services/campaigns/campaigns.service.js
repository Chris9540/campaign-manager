// Initializes the `users` service on path `/users`
const createService = require('feathers-sequelize')
const createModel = require('../../models/campaigns.model')
const createThroughModel = require('../../models/campaign_roles.model')
const hooks = require('./campaigns.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  createThroughModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/campaigns', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('campaigns')

  service.hooks(hooks)
}