var SocketEvents = (function (my) {
    var socket;
    var game;      
    
    var createSocketEvents = function () {
        socket.on("c_CreateLocalPlayer", function (playerData) {
            GameEngine.CreateLocalPlayer(playerData);                  
        });
        
        //socket.on("c_CreateNewRemotePlayer", function (playerData) {
        //    //createNewRemotePlayer(game, socket, playerData);
        //});
    };
        
    my.Init = function (_socket, _game) {        

        socket = _socket;
        game = _game;
                
        createSocketEvents();
    };
    
    return my;
}(SocketEvents || {}, phaserGame));