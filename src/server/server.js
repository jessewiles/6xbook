//var connect = require('connect'),
//    serveStatic = require('serve-static'),
//    path = require('path'),
//    srcDir = path.dirname(__dirname),
//    appDir = path.join(srcDir, 'client', 'public');

//connect().use(serveStatic(appDir)).listen(7000, function(){
//    console.log('Serving appdir: ' +appDir+ ', running on 7000...');
//});
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

const srcDir = path.dirname(__dirname)
const appDir = path.join(srcDir, 'client', 'public')

app.use(express.static(appDir))


app.listen(7000, () => console.log('6xapp listening on port 7000.'))
