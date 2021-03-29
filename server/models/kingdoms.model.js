'use strict'

const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes
module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const Kingdoms = sequelizeClient.define('kingdoms', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }


  }, {
    underscored: true,
    hooks: {
      beforeCount(options) {
        options.raw = true
      }
    }
  })

  Kingdoms.associate = function (models) {
    
  }

  return Kingdoms
}