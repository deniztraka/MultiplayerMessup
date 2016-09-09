var InputManager = (function (my) {
    var game;
    var socket;
    var keys = {};   


    my.Init = function (_game,_socket) {
        game = _game;
        socket = _socket;

        keys['UP'] = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        keys['DOWN'] = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        keys['LEFT'] = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        keys['RIGHT'] = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        keys['SHIFT'] = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT)
        
        keys['W'] = game.input.keyboard.addKey(Phaser.Keyboard.W);
        keys['S'] = game.input.keyboard.addKey(Phaser.Keyboard.S);
        keys['A'] = game.input.keyboard.addKey(Phaser.Keyboard.A);
        keys['D'] = game.input.keyboard.addKey(Phaser.Keyboard.D);
        keys['E'] = game.input.keyboard.addKey(Phaser.Keyboard.E);

    };
    
    my.CheckMovement = function () { 
        if (keys['UP'].isDown || keys['W'].isDown) {
            socket.emit("onUpKeyPressed", true);
        }
        else if (keys['DOWN'].isDown || keys['S'].isDown) {
            socket.emit("onDownKeyPressed", true);
        }
        
        if (keys['LEFT'].isDown || keys['A'].isDown) {
            socket.emit("onLeftKeyPressed", true);
        }
        else if (keys['RIGHT'].isDown || keys['D'].isDown) {
            socket.emit("onRightKeyPressed", true);
        }
        
        if (keys['SHIFT'].isDown) {
            socket.emit("onShiftKeyPressed", true);
        }
        
        if (keys['E'].isDown) {
            socket.emit("onEKeyPressed", true);
        }
        
        game.input.keyboard.onUpCallback = function (e) {
            if (e.keyCode == Phaser.Keyboard.SHIFT) {
                socket.emit("onShiftKeyPressed", false);
            } else if (e.keyCode == Phaser.Keyboard.E) {
                socket.emit("onEKeyPressed", false);
            }
        }
        
        game.input.keyboard.onDownCallback = function (e) {
            if (e.keyCode == Phaser.Keyboard.E) {
                socket.emit(Constants.EventNames.OnEKeyPressed, true);
            }
        }
    };

    
    return my;
}(InputManager || {}));