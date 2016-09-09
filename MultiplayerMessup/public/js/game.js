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
        GameEngine.Init(self);
               
        self.buildWorld();

        socket = io(window.location.origin, { query: 'name=' + self.playerName });
        SocketEvents.Init(socket,self);
            
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
        
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        // using RESIZE scale mode
        game.scale.scaleMode = Phaser.ScaleManager.SHOWALL;
        game.scale.updateLayout();

        //add floor dirt tile
        tilesprite = game.add.tileSprite(0, 0, game.world.bounds.width, game.world.bounds.height, 'dirt');
    }
};

