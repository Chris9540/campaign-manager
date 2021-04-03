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
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
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
    Kingdoms.hasMany(models.burgs, {
      foreignKey: 'kingdom_id',
      as: 'kingdom_burgs'
    })
  }

  return Kingdoms
}