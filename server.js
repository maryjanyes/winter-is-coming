const http = require('http');
const path = require('path');
const os = require('os');
const express = require('express');
const winterIsComingGame = express();
const platform = os.platform();
const server = http.createServer(winterIsComingGame).listen(1000);
const boardSockets = require('./sockets');
const routers = require('./routers');
const bodyParser = require('body-parser');
winterIsComingGame.use(bodyParser.urlencoded({ extended: true }));
winterIsComingGame.use(bodyParser.json());

winterIsComingGame.use('/app', routers);

server.on('listening', () => {
    console.log('Game server listen on ' + 1000);
    console.log('Game platform:', platform);
});

server.on('error', (err) => {
    console.log('Server listen error: ', err);
    process.exit(1);
});

function runExtensions() {
    winterIsComingGame.use('/', require(path.join(__dirname, '/routers')));
    winterIsComingGame.use(express.static(__dirname + '/public'));
}

runExtensions();

module.exports = winterIsComingGame;
