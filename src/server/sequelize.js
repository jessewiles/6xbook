'use strict'

const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

const srcDir = path.dirname(__dirname)
const dbpath = path.join(srcDir, "6xbook.db")

const sequelize = new Sequelize('sqlite://' + dbpath)

sequelize
    .authenticate()
    .then(() => console.log("It worked!"))
    .catch(err => console.error("It didn't work!"))

const Foosball = sequelize.define('foosball', {
    name: { type: Sequelize.STRING },
    phone: { type: Sequelize.STRING },
    bennie: { type: Sequelize.JSON },
})

try {
    Foosball.sync()
}
catch(e) {
    // pass
}

Foosball.create({name: "Josie", phone: "777.555.4321", bennie: JSON.stringify({alpha: 'all', beta: 'bombastic'})})
Foosball.findAll().then(fbs => {
    fbs.map(fb => console.log(JSON.parse(fb.get('bennie'))))
})
