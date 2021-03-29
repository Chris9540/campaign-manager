'use strict'

const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const campaign_roles = sequelizeClient.define('campaign-roles', {
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    character_sheet: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    underscored: true,
    hooks: {
      beforeCount(options) {
        options.raw = true
      }
    }
  })

  return campaign_roles
}
