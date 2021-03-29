'use strict'
const asyncEach = require('../../helpers/asyncEach');

module.exports = async function createRoles (context) {
  const service = await context.app.service('campaign-roles')
  const roles = context.data.campaignRoles
  const id = context.result.id
  const campaignRoles = []
  if (Array.isArray(roles) && roles.length > 0) {
    await asyncEach(roles, async ({userId, role, characterSheet}) => {
      const newRole = {userId, role, characterSheet, campaignId: id}
      await service.create(newRole)
      campaignRoles.push(newRole)
    });
  }
  context.result.campaignRoles = campaignRoles
  return context;
};


