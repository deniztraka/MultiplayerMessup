var config = require('./server/common/config.js');
var constants = require('./server/common/constants.js');
var express = require('express');
var app = express();
var serv = require('http').Server(app);
var io = require('socket.io')(serv, {});
var p2 = require('p2');

var player = require('./server/core/mobile/player.js');

// Server props
var lastTimeSeconds;
var totalElapsedTimeFromSeconds = 0;

// opening server
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use('/public', express.static(__dirname + '/public'));
serv.listen(process.env.PORT || config.server.port, function (s) {

});

io.on(constants.events.connect, function (socket) {
    onPlayerConnect(socket, io);
});

var onPlayerConnect = function (socket, io) {   
    //player is created
    var player = new player(socket); 
    
    //send playerInfo to the sender
    socket.emit(constants.commands.createLocalPlayer, player.clientInfo);
    
    //send playerInfo to the all clients except sender
    socket.broadcast.emit(constants.commands.createNewRemotePlayer, player.clientInfo);
};

// creating world
var world = new p2.World({
    gravity: [0, 0]
});
// Turn off global gravity
world.applyGravity = false;

setInterval(function () {
    totalElapsedTimeFromSeconds += config.server.serverProcessFrequency;
    var deltaTime = totalElapsedTimeFromSeconds - lastTimeSeconds;
    
    processWorld(deltaTime);        
    
    lastTimeSeconds = totalElapsedTimeFromSeconds;
}, 1000 * config.server.serverProcessFrequency);

var processWorld = function (deltaTime) {
    try {
        world.step(config.server.serverProcessFrequency, deltaTime, config.server.maxSubSteps);
    } catch (e) {
        logger.log("Error occurred at world.step(). message: " + e);
    };
};