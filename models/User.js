const pls = require('passport-local-sequelize')
const { DataTypes } = require('sequelize')
const sequelize = require('../db')


const User = pls.defineUser(sequelize, { username: DataTypes.STRING })

module.exports = User
