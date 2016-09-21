var constants = require('../common/constants.js');
var logger = require('../common/logger.js');

var InputManager = function (_socket, _player) {
    var socket = _socket;
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
    
    var updateRotation = function (mousePosition) {
        player.mousePosition = mousePosition;
    };
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
    
    //var updateRotation = function (player, mousePosition) {
    //    player.angle = Math.atan2(mousePosition.x - player.weapon.position[0], -(mousePosition.y - player.weapon.position[1]));
    //};
    
    this.CreateSocketEvents = function () {
        //attach player action events
        //socket.on(Constants.EventNames.OnMouseClicked, function (mousePosition) {
        //    onMouseClicked(player, mousePosition);
        //});
        //socket.on(Constants.EventNames.OnEKeyPressed, function (isDown) {
        //    onEKeyPressed(player, isDown);
        //});
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
        //socket.on("c_OnShiftKeyPressed", function (isDown) {
        //    onShiftKeyPressed(player, isDown);
        //});

    };        
};

module.exports = InputManager;