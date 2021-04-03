'use strict'

const Seed = require('./seed.class')
const hooks = require('./seed.hooks')

module.exports = function (app) {

  app.use('/seed', new Seed(app))

  const service = app.service('seed')

  service.hooks(hooks)
}