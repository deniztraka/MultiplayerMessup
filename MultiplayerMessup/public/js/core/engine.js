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

    my.UpdatePlayerPositionsAndRotations = function (playerPositionsAndRotationsDatas) {
        for (var id in playerPositionsAndRotationsDatas) {
            var playerPositionAndRotationData = playerPositionsAndRotationsDatas[id];
            var player = playerList[id];

            if (playerPositionAndRotationData.positions.length == 3) {
                game.add.tween(player).to(
                    {
                        x: [playerPositionAndRotationData.positions[0].x, playerPositionAndRotationData.positions[1].x, playerPositionAndRotationData.positions[2].x],
                        y: [playerPositionAndRotationData.positions[0].y, playerPositionAndRotationData.positions[1].y, playerPositionAndRotationData.positions[2].y]
                    }, 1000 / 10, Phaser.Easing.Linear.None, true);
            }

            if (playerPositionAndRotationData.rotations.length == 3) {
                //game.add.tween(player).to({ rotation: [30, 60, 90] }, 1000 / 10, Phaser.Easing.Linear.None, true);
                game.add.tween(player).to({ rotation: [playerPositionAndRotationData.rotations[0], playerPositionAndRotationData.rotations[1], playerPositionAndRotationData.rotations[2]] }, 1000 / 10, Phaser.Easing.Linear.None, true);
//                console.log(" 0:" + playerPositionAndRotationData.rotations[0] + " 1:" + playerPositionAndRotationData.rotations[1] + " 2:" + playerPositionAndRotationData.rotations[2]);
            }
        }
    };

    return my;
}(GameEngine || {}));