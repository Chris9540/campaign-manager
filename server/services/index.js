const users = require('./users/users.service');
const campaigns = require('./campaigns/campaigns.service')
const campaignRoles = require('./campaign-roles/campaign-roles.service')
const uploads = require('./uploads/uploads.service')
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(campaigns);
  app.configure(campaignRoles);
  app.configure(uploads)
};
