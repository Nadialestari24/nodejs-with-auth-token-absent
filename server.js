var http = require('http');
var port = process.env.PORT || 3000;
var app = require('./app');
var server = http.createServer(app);
server.listen(port);



