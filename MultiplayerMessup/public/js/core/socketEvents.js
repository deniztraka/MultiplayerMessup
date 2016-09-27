var ServerEvents = (function (my) {
    var socket;
    var game;

    var createSocketEvents = function () {
        socket.on("s_CreateLocalPlayer", function (playerData) {
            GameEngine.CreateLocalPlayer(playerData);
        });

        socket.on("s_UpdatePlayerPositionsAndRotations", function (playerPositionsAndRotationsDatas) {
            GameEngine.UpdatePlayerPositionsAndRotations(playerPositionsAndRotationsDatas);
        });

        socket.on("s_CreateAlreadyLoggedInPlayers", function (playerList) {
            for (var i = 0; i < playerList.length; i++) {
                GameEngine.CreateNewRemotePlayer(playerList[i]);
            };
        });

        socket.on("s_RemovePlayer", function (playerData) {
            GameEngine.RemovePlayer(playerData);
        });

        socket.on("s_CreateNewRemotePlayer", function (playerData) {
            GameEngine.CreateNewRemotePlayer(playerData);
        });
    };

    my.Init = function (_socket, _game) {
        socket = _socket;
        game = _game;

        createSocketEvents();
    };

    return my;
} (ServerEvents || {}));