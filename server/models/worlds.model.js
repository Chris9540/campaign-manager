'use strict'

const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes
module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const Worlds = sequelizeClient.define('worlds', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    primary: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    },
    description: {
      type: DataTypes.STRING
    },
    map_link: {
      type: DataTypes.STRING,
      allowNul:true
    }
  }, {
    underscored: true,
    hooks: {
      beforeCount(options) {
        options.raw = true
      }
    }
  })

  Worlds.associate = function (models) {
    
  }

  return Worlds
}