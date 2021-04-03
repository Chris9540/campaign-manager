'use strict'

const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes
module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const Burgs = sequelizeClient.define('burgs', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name : {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    capital : {
      type: DataTypes.BOOLEAN
    },
    port : {
      type: DataTypes.BOOLEAN
    },
    citadel : {
      type: DataTypes.BOOLEAN
    },
    walls : {
      type: DataTypes.BOOLEAN
    },
    plaza : {
      type: DataTypes.BOOLEAN
    },
    temple : {
      type: DataTypes.BOOLEAN
    },
    shanty_town : {
      type: DataTypes.BOOLEAN
    },
    population : {
      type: DataTypes.BIGINT
    },
    burg_id : {
      type: DataTypes.STRING
    },
    seed: {
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

  Burgs.associate = function (models) {
    Burgs.hasMany(models.populations, {
      foreignKey: 'burg_id',
      as: 'burg_populations'
    })
  }

  return Burgs
}