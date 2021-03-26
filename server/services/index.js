const users = require('./users/users.service');
const campaigns = require('./campaigns/campaigns.service')
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(campaigns);
};
