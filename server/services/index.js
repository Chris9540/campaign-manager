const campaigns = require('./campaigns/campaigns.service')
const campaignRoles = require('./campaign-roles/campaign-roles.service')
const kingdoms = require('./kingdoms/kingdoms.service');
const populations = require('./populations/populations.service');
const races = require('./races/races.service')
const uploads = require('./uploads/uploads.service');
const users = require('./users/users.service');
const worlds = require('./worlds/worlds.service');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(campaigns);
  app.configure(campaignRoles);
  app.configure(kingdoms);
  app.configure(populations);
  app.configure(races);
  app.configure(uploads);
  app.configure(worlds);
};
