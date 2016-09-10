var constants = require('../common/constants.js');
var logger = require('../common/logger.js');
var Player = require('./mobile/player.js');
var GameManager = require('./gameManager.js');
var InputManager = require('./inputManager.js');
var SocketCommandManager = require('./socketCommandManager.js');

var PlayerManager = (function (my) {
    var socket;
    var player;

    var disconnectPlayer = function () {
        SocketCommandManager.RemovePlayer(socket, player.clientInfo);        
        GameManager.RemovePlayerFromWorld(player);
    };

    var createSocketEvents = function () {
        //attach player disconnected event
        socket.on(constants.eventNames.disconnect, function () {
            disconnectPlayer(player, socket);
        });

        //attach input events coming from client
        InputManager.CreateSocketEvents();
    };

    my.Init = function (_socket) {
        socket = _socket;

        //Initializing connected player        
        var player = new Player(socket.handshake.query["name"]);
        GameManager.AddPlayerToWorld(player);

        SocketCommandManager.CreateLocalPlayer(socket, player.clientInfo);
        SocketCommandManager.CreateNewRemotePlayer(socket, player.clientInfo);

        //Initializing player input manager
        InputManager.Init(socket, player);
        createSocketEvents();
    };

    return my;
} (PlayerManager || {}));

module.exports = PlayerManager;