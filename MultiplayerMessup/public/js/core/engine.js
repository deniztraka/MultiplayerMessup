var GameEngine = (function (my) {
    var game; 
    var playerList = {};   
    my.Init = function (_game) {
        game = _game;
    };

    my.CreateLocalPlayer = function (playerData) {       
        var player = game.add.sprite(playerData.position.x, playerData.position.y, 'player');
        player.anchor.setTo(0.5, 0.5);
        game.camera.follow(player);   

        playerList[playerData.id] = player;
    };

    my.UpdatePlayerPositions = function (playerPositionsDatas) {
        for (var id in playerPositionsDatas) {
            var playerPositionData = playerPositionsDatas[id];
            var player = playerList[id];

            //if (player.position) {
                //position update
                game.add.tween(player).to({ x: playerPositionData.position.x, y: playerPositionData.position.y }, 1000/30, Phaser.Easing.Linear.None, true);
                //player.position.x = playerPositionData.position.x;
                //player.position.y = playerPositionData.position.y;
            //}
        }
    };

    return my;
}(GameEngine || {}));