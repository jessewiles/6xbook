var connect = require('connect'),
    serveStatic = require('serve-static'),
    path = require('path'),
    srcDir = path.dirname(__dirname),
    appDir = path.join(srcDir, 'client');

connect().use(serveStatic(appDir)).listen(7000, function(){
    console.log('Serving appdir: ' +appDir+ ', running on 7000...');
});
