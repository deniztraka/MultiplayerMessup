GameStates.Game = function (game) {  
};

var socket;

GameStates.Game.prototype = {
    init: function (playerName) {
        this.playerName = playerName;
    },
    preload: function () {
        var self = this;
        self.game.time.advancedTiming = true;
        $(window).resize(function () {
            self.resize();
        });
        self.resize();
    },
    create: function () {
        var self = this;
        
        self.buildWorld();

        socket = io(window.location.origin, { query: 'name=' + self.playerName });
        self.attachServerEvents(socket);
    },

    update: function () { },
    
    render: function () { },

    resize: function () {
        this.scale.setGameSize($(window).width(), $(window).height());
    },

    buildWorld: function () {
        var game = this;

        game.world.setBounds(0, 0, 1920, 1920);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //add floor dirt tile
        tilesprite = game.add.tileSprite(0, 0, game.world.bounds.width, game.world.bounds.height, 'dirt');
    },

    attachServerEvents: function (socket) {
        var game = this;
        socket.on("c_CreateLocalPlayer", function (playerData) {
            createLocalPlayer(game, socket, playerData);
        });

        socket.on("c_CreateNewRemotePlayer", function (playerData) {
            //createNewRemotePlayer(game, socket, playerData);
        });
    }
};

var createLocalPlayer = function (game, socket, playerData) {
    var player = game.add.sprite(playerData.position.x, playerData.position.y, 'player');
    player.anchor.setTo(0.5, 0.5);
};

