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
      allowNull: true,
      defaultValue: false
    },
    description: {
      type: DataTypes.STRING
    },
    map_svg: {
      type: DataTypes.STRING,
      allowNul:true
    },
    burg_json: {
      type: DataTypes.STRING,
      allowNull: true
    },
    marker_json: {
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

  Worlds.associate = function (models) {
    Worlds.hasMany(models.kingdoms, {
      foreignKey: 'world_id',
      as: 'world_kingdoms'
    })
  }

  return Worlds
}