var SocketCommandManager = (function (my) {
    var io;

    //sending s_UpdatePlayerPositionsAndRotations command to every socket
    my.UpdatePlayersPositionsAndRotations = function (playerPositionsAndRotationsData) {
        io.emit("s_UpdatePlayerPositionsAndRotations", playerPositionsAndRotationsData);
    };

    //sending playerInfo to the this socket only
    my.CreateLocalPlayer = function (socket, playerClientInfo) {
        socket.emit("s_CreateLocalPlayer", playerClientInfo);
    };

    //sending playerInfo to the all clients except this socket
    my.CreateNewRemotePlayer = function (socket, playerClientInfo) {
        socket.broadcast.emit("s_CreateNewRemotePlayer", playerClientInfo);
    };

    //send disconnected playerInfo to the all clients except this socket
    my.RemovePlayer = function (socket, playerClientInfo) {
        socket.broadcast.emit("s_RemovePlayer", playerClientInfo);
    };

    my.Init = function (_io) {
        io = _io;
    };

    return my;
} (SocketCommandManager || {}));

module.exports = SocketCommandManager;