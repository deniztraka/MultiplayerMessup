var InputManager = (function (my) {
    var game;
    var socket;

    var upDown = false;
    var leftDown = false;
    var rightDown = false;
    var downDown = false;
    var shiftDown = false;
    var eDown = false;
    var nextMousePositionSendTime = 0;
    var nextMouseClicked = 0;
    
    function mouseClickHandle() {
        var totalElapsedSeconds = game.time.now;
        if (totalElapsedSeconds > nextMouseClicked) {
            nextMouseClicked = totalElapsedSeconds + 500;
            socket.emit("c_OnMouseClicked", { x: game.input.mousePointer.worldX, y: game.input.mousePointer.worldY });
        }
    }

    my.Init = function (_game, _socket) {
        game = _game;
        socket = _socket;
    };

    my.CheckMovement = function () {
        game.input.keyboard.onUpCallback = function (e) {
            if (e.keyCode == Phaser.Keyboard.W || e.keyCode == Phaser.Keyboard.UP) {
                socket.emit("c_OnUpKeyPressed", false);
                upDown = false;
                //console.log("upUp");
            }
            if (e.keyCode == Phaser.Keyboard.S || e.keyCode == Phaser.Keyboard.DOWN) {
                socket.emit("c_OnDownKeyPressed", false);
                downDown = false;
                //console.log("downUp");
            }
            if (e.keyCode == Phaser.Keyboard.A || e.keyCode == Phaser.Keyboard.LEFT) {
                socket.emit("c_OnLeftKeyPressed", false);
                leftDown = false;
                //console.log("leftUp");
            }
            if (e.keyCode == Phaser.Keyboard.D || e.keyCode == Phaser.Keyboard.RIGHT) {
                socket.emit("c_OnRightKeyPressed", false);
                rightDown = false;
                //console.log("rightUp");
            }
            if (e.keyCode == Phaser.Keyboard.E) {
                socket.emit("c_OnEKeyPressed", false);
                eDown = false;
                //console.log("eUp");
            }
            if (e.keyCode == Phaser.Keyboard.SHIFT) {
                socket.emit("c_OnShiftKeyPressed", false);
                shiftDown = false;
                //console.log("shiftUp");
            }
        }

        game.input.keyboard.onDownCallback = function (e) {
            if (e.keyCode == Phaser.Keyboard.W || e.keyCode == Phaser.Keyboard.UP) {
                if (!upDown) {
                    upDown = true;
                    //console.log("upDown");
                    socket.emit("c_OnUpKeyPressed", true);
                }
            }
            if (e.keyCode == Phaser.Keyboard.S || e.keyCode == Phaser.Keyboard.DOWN) {
                if (!downDown) {
                    downDown = true;
                    //console.log("downDown");
                    socket.emit("c_OnDownKeyPressed", true);
                }
            }
            if (e.keyCode == Phaser.Keyboard.A || e.keyCode == Phaser.Keyboard.LEFT) {
                if (!leftDown) {
                    leftDown = true;
                    //console.log("leftDown");
                    socket.emit("c_OnLeftKeyPressed", true);
                }
            }
            if (e.keyCode == Phaser.Keyboard.D || e.keyCode == Phaser.Keyboard.RIGHT) {
                if (!rightDown) {
                    rightDown = true;
                    //console.log("rightDown");
                    socket.emit("c_OnRightKeyPressed", true);
                }
            }
            if (e.keyCode == Phaser.Keyboard.E) {
                if (!eDown) {
                    eDown = true;
                    //console.log("eDown");
                    socket.emit("c_OnEKeyPressed", true);
                }
            }
            if (e.keyCode == Phaser.Keyboard.SHIFT) {
                if (!shiftDown) {
                    shiftDown = true;
                    //console.log("shiftDown");
                    socket.emit("c_OnShiftKeyPressed", true);
                }
            }
        }
    };

    my.CheckMousePosition = function () {
        var totalElapsedSeconds = game.time.now;
        if (totalElapsedSeconds > nextMousePositionSendTime) {
            nextMousePositionSendTime = totalElapsedSeconds + 1000/15;
            socket.emit("c_MousePosition", { x: game.input.mousePointer.worldX, y: game.input.mousePointer.worldY });
        }
    };
    
    
    
    my.CheckMouseClicks = function () { 
        game.input.activePointer.leftButton.onDown.add(function () {
            mouseClickHandle();
        }, this);
    };

    return my;
} (InputManager || {}));