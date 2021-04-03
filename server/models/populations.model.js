'use strict'

const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes
module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const Populations = sequelizeClient.define('populations', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    percent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }



  }, {
    underscored: true,
    hooks: {
      beforeCount(options) {
        options.raw = true
      }
    }
  })

  Populations.associate = function (models) {
    
  }

  return Populations
}