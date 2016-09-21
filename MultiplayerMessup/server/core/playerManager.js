var constants = require('../common/constants.js');
var logger = require('../common/logger.js');
var Player = require('./mobile/player.js');
var GameManager = require('./gameManager.js');
var InputManager = require('./inputManager.js');
var SocketCommandManager = require('./socketCommandManager.js');

var PlayerManager = function (_socket) {
    var socket = _socket;
    var player;
    var inputManager;
    
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
        inputManager.CreateSocketEvents();
    };
    
    var init = function () {
        if (socket) {
            SocketCommandManager.CreateAlreadyLoggedInPlayers(socket, GameManager.GetPlayerList());
            
            //Initializing connected player
            player = new Player(socket.handshake.query["name"]);
            GameManager.AddPlayerToWorld(player);
            
            SocketCommandManager.CreateLocalPlayer(socket, player.clientInfo);
            SocketCommandManager.CreateNewRemotePlayer(socket, player.clientInfo);
            
            //Initializing player input manager
            inputManager = new InputManager(socket, player);
            createSocketEvents();
        }
    };
    
    init();
};

module.exports = PlayerManager;