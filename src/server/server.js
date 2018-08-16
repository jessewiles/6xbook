'use strict'

const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

const srcDir = path.dirname(__dirname)
const appDir = path.join(srcDir, 'client', 'public')

app.use((req, res, next)  => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(appDir))


app.listen(7000, () => console.log('6xapp listening on port 7000.'))
