'use strict'

const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes
module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const Races = sequelizeClient.define('races', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNUll: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    index: {
      type: DataTypes.STRING
    },
    link: {
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

  Races.associate = function (models) {
    Races.hasMany(models.populations, {
      foreignKey: 'race_id',
      as: 'race_populations'
    })
  }

  return Races
}