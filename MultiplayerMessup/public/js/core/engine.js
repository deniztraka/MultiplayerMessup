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

            if (playerPositionData.positions.length == 3) {
                game.add.tween(player).to(
                    {
                        x: [playerPositionData.positions[0].x, playerPositionData.positions[1].x, playerPositionData.positions[2].x],
                        y: [playerPositionData.positions[0].y, playerPositionData.positions[1].y, playerPositionData.positions[2].y]
                    }, 1000 / 10, Phaser.Easing.Linear.None, true);
            }
        }
    };

    return my;
}(GameEngine || {}));