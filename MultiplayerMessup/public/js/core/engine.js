var GameEngine = (function (my) {
    var game;
    my.Init = function (_game) {
        game = _game;
    };

    my.CreateLocalPlayer = function (playerData) {       
        var player = game.add.sprite(playerData.position.x, playerData.position.y, 'player');
        player.anchor.setTo(0.5, 0.5);
        game.camera.follow(player);        
    };

    return my;
}(GameEngine || {}));