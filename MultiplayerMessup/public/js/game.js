GameStates.Game = function (game) {  
};

var socket;

GameStates.Game.prototype = {
    preload: function () {
        this.game.time.advancedTiming = true;
        
    },
    create: function () {
        this.world.setBounds(0, 0, 1024, 768);
        this.physics.startSystem(Phaser.Physics.ARCADE);
        tilesprite = this.add.tileSprite(0, 0, this.world.bounds.width, this.world.bounds.height, 'dirt');        

        socket = io(window.location.origin);
        attachServerEvents(this, socket);
    },
    update: function () { },
    
    render: function () { },
};

var attachServerEvents = function (game, socket) {
    socket.on("createLocalPlayer", function (playerData) {
        createLocalPlayer(game, socket, playerData);
    });
};

var createLocalPlayer = function (game, socket, playerData) {
    var player = game.add.sprite(playerData.position.x, playerData.position.y, 'player');
    player.anchor.setTo(0.5, 0.5);
};

