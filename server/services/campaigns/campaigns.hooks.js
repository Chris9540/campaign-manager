'use strict'

const addPlayers = require('../../hooks/campaigns/createRoles')
const relationships = require('../../hooks/campaigns/relationships')
module.exports = {
  before: {
    all: [],
    find: [relationships],
    get: [relationships],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [addPlayers],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}