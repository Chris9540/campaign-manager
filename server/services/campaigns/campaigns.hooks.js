'use strict'

const addPlayers = require('../../hooks/campaigns/createRoles')
const findRelationships = require('../../hooks/campaigns/findRelationships')
const getRelationships = require('../../hooks/campaigns/getRelationships')
module.exports = {
  before: {
    all: [],
    find: [findRelationships],
    get: [getRelationships],
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