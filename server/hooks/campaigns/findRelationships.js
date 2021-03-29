'use strict';

/**
 * @param {Object} context - The request context
 * @return {Object} context
 * @description Populates the response the the reuqested relationships
 */
module.exports = async function campaignsRelationships (context) {
  const sequelize = context.app.get('sequelizeClient');

  context.params.sequelize = {
    raw: false,
    include: [
      {
        as: 'campaign_owner',
        model: sequelize.models.users,
        attributes: ['name', 'id']
      },
    ]
  };

  return context;
};
