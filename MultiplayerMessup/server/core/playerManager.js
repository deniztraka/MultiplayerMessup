var constants = require('../common/constants.js');
var logger = require('../common/logger.js');
var Player = require('./mobile/player.js');
var GameManager = require('./gameManager.js');
var InputManager = require('./inputManager.js');
var SocketCommandManager = require('./socketCommandManager.js');

var PlayerManager = function (socket) {
    var self = this;
    self.socket = socket;
    self.player = new Player(self.socket.handshake.query["name"]);
    self.inputManager = new InputManager(self.socket, self.player);
    

    var disconnectPlayer = function () {
        SocketCommandManager.RemovePlayer(self.socket, self.player.clientInfo);
        GameManager.RemovePlayerFromWorld(self.player);
    };
    
    var createSocketEvents = function () {
        //attach player disconnected event
        socket.on(constants.eventNames.disconnect, function () {
            disconnectPlayer();
        });
    };
    
    createSocketEvents();
};

module.exports = PlayerManager;