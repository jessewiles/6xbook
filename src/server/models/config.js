'use strict'

const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

const srcDir = path.dirname(__dirname)
const dbpath = path.join(srcDir, "6xbook.db")

const sequelize = new Sequelize('sqlite://' + dbpath)

module.exports = { sequelize }
