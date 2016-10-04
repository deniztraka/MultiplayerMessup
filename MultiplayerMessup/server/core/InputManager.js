var constants = require('../common/constants.js');
var logger = require('../common/logger.js');

var InputManager = function (socket, _player) {
    var player = _player;

    var onUpKeyPressed = function (isDown) {
        player.movementStates.isMovingUp = isDown;
    };
    var onDownKeyPressed = function (isDown) {
        player.movementStates.isMovingDown = isDown;
    };
    var onLeftKeyPressed = function (isDown) {
        player.movementStates.isMovingLeft = isDown;
    };
    var onRightKeyPressed = function (isDown) {
        player.movementStates.isMovingRight = isDown;
    };    
    var onShiftKeyPressed = function (isDown) {
        player.movementStates.isRunning = isDown;
    };
    var updateRotation = function (mousePosition) {
        player.mousePosition = mousePosition;
    };    

    //attach mouse position event
    socket.on("c_MousePosition", function (mousePos) {
        updateRotation(mousePos);
    });

    //attach movement events
    socket.on("c_OnUpKeyPressed", function (isDown) {
        onUpKeyPressed(isDown);
    });
    socket.on("c_OnDownKeyPressed", function (isDown) {
        onDownKeyPressed(isDown);
    });
    socket.on("c_OnLeftKeyPressed", function (isDown) {
        onLeftKeyPressed(isDown);
    });
    socket.on("c_OnRightKeyPressed", function (isDown) {
        onRightKeyPressed(isDown);
    });
    socket.on("c_OnEKeyPressed", function (isDown) {
        onShiftKeyPressed(isDowon);
    });
    socket.on("c_OnShiftKeyPressed", function (isDown) {
        onShiftKeyPressed(isDown);
    });

    //var onMouseClicked = function (player, mousePosition) {
    //    var canSlash = attack(player);
    //    if (canSlash) {
    //        processSlash(player, mousePosition);
    //    }
    //};

    //var onShiftKeyPressed = function (player, isDown) {
    //    player.isRunning = isDown;
    //    if (isDown) {
    //        if (player.stamina > 0) {
    //            player.stamina -= serverConfig.gamePlay.staminaDecreaseRateWhileRunning;
    //        } else {
    //            player.isRunning = false;
    //            player.stamina = 0;
    //        }
    //    } else {
    //        player.isRunning = false;
    //    }
    //};
    //var onEKeyPressed = function (player, isDown) {
    //    if (isDown && !player.DefendMode) {
    //        player.SetDefendMode(true);
    //        world.removeConstraint(player.shieldConstraint);
    //        world.addConstraint(player.defendConstraint);
    //        player.speed = serverConfig.gamePlay.defendSpeed;
    //    } else if (!isDown) {
    //        player.SetDefendMode(false);
    //        world.removeConstraint(player.defendConstraint);
    //        world.addConstraint(player.shieldConstraint);
    //        player.speed = serverConfig.gamePlay.movementSpeed;
    //    }
    //};

};

module.exports = InputManager;