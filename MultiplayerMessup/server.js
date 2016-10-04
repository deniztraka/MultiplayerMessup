var config = require('./server/common/config.js');
var constants = require('./server/common/constants.js');
var PlayerManager = require('./server/core/playerManager.js');
var GameManager = require('./server/core/gameManager.js');
var SocketCommandManager = require('./server/core/socketCommandManager.js');
var express = require('express');
var app = express();
var serv = require('http').Server(app);
var io = require('socket.io')(serv, {});
var p2 = require('p2');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use('/public', express.static(__dirname + '/public'));

// server props
var lastTimeSeconds;
var totalElapsedTimeFromSeconds = 0;

GameManager.Init();
SocketCommandManager.Init(io);

// opening server
serv.listen(process.env.PORT || config.server.port, function (s) {


});

// player connected event
io.on(constants.eventNames.connect, function (socket) {
    SocketCommandManager.CreateAlreadyLoggedInPlayers(socket, GameManager.GetPlayerList());

    var playerManager = new PlayerManager(socket);
    GameManager.AddPlayerToWorld(playerManager.player, socket);

    SocketCommandManager.CreateLocalPlayer(socket, playerManager.player.clientInfo);
    SocketCommandManager.CreateNewRemotePlayer(socket, playerManager.player.clientInfo);
});

// main game loop
setInterval(function () {
    totalElapsedTimeFromSeconds += config.server.serverProcessFrequency;
    var deltaTime = totalElapsedTimeFromSeconds - lastTimeSeconds;

    GameManager.ProcessWorld(deltaTime);
    GameManager.UpdateTotalElapsedTimeFromSeconds(totalElapsedTimeFromSeconds);
    lastTimeSeconds = totalElapsedTimeFromSeconds;
}, 1000 * config.server.serverProcessFrequency);