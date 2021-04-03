'use strict'

const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const campaigns = sequelizeClient.define('campaigns', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    underscored: true,
    hooks: {
      beforeCount(options) {
        options.raw = true
      }
    }
  })

  campaigns.associate = function (models) {
    campaigns.belongsToMany(models.users, {
      through: 'campaign-roles',
      as: 'campaign_players'
    })
    campaigns.belongsTo(models.users, { 
      foreignKey: 'owner',
      as: 'campaign_owner'
    })
    campaigns.hasMany(models.worlds, {
      foreignKey: 'campaign_id',
      as: 'campaign_worlds'
    })
  }

  return campaigns
}
