'use strict'

const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient')
  const uploads = sequelizeClient.define('uploads', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    uri: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    underscored: true,
    hooks: {
      beforeCount(options) {
        options.raw = true
      }
    }
  })

  return uploads
}
