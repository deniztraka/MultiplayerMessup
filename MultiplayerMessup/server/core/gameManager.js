var config = require('../common/config.js');
var constants = require('../common/constants.js');
var logger = require('../common/logger.js');
var utils = require('../common/utils.js');
var SocketCommandManager = require('./socketCommandManager.js');
var GameManager = (function (my) {
    var io;
    var world;
    var bodyRemovalList = [];

    var playerCount = 0;
    var totalElapsedTimeFromSeconds = 0;

    var clearBodyRemovalList = function () {
        if (bodyRemovalList.length > 0) {
            for (var i = 0; i < bodyRemovalList.length; i++) {
                var body = bodyRemovalList[i];
                if (body.type == constants.game.player.type) {
                    world.removeBody(body);
                    logger.info(body.pName + " is removed from world.");
                    playerCount--;
                }
            }
            bodyRemovalList = [];
        }
    };

    var playersPositionsAndRotationsData = {};
    var quePositionAndRotationData = function () {
        if (playerCount > 0) {
            for (var i = 0; i < world.bodies.length; i++) {
                var body = world.bodies[i];
                if (body.type = constants.game.player.type) {
                    var player = body;

                    if (playersPositionsAndRotationsData[player.id]) {
                        playersPositionsAndRotationsData[player.id].positions.push(
                            {
                                x: player.position[0],
                                y: player.position[1]
                            }
                        );
                        playersPositionsAndRotationsData[player.id].rotations.push(player.angle);
                    } else {
                        playersPositionsAndRotationsData[player.id] = {
                            positions: [{
                                x: player.position[0],
                                y: player.position[1],
                            }],
                            rotations: [player.angle],
                            id: player.id
                        };
                    }
                }
            };
        }
    };

    var sendPosAndRotData = function () {
        if (playerCount > 0) {
            SocketCommandManager.UpdatePlayersPositionsAndRotations(playersPositionsAndRotationsData);
        }
        playersPositionsAndRotationsData = {};
    };

    var processPlayerMovementsAndRotations = function () {
        if (playerCount > 0) {

            for (var i = 0; i < world.bodies.length; i++) {
                var body = world.bodies[i];
                if (body.type = constants.game.player.type) {
                    var player = body;

                    player.angle = Math.getAngle({ x: player.position[0], y: player.position[1] }, { x: player.mousePosition.x, y: player.mousePosition.y });
                    //logger.debug(player.mousePosition.x + " " + player.mousePosition.y + " " + Math.toDegrees(player.angle));
                    if (player.movementStates.isMovingUp) {
                        player.position[1] -= player.speed;
                    }
                    if (player.movementStates.isMovingDown) {
                        player.position[1] += player.speed;
                    }
                    if (player.movementStates.isMovingLeft) {
                        player.position[0] -= player.speed;
                    }
                    if (player.movementStates.isMovingRight) {
                        player.position[0] += player.speed;
                    }
                }
            };
        }
    };

    my.RemovePlayerFromWorld = function (player) {
        bodyRemovalList.push(player);
    };

    my.AddPlayerToWorld = function (player) {
        world.addBody(player);
        logger.info(player.pName + " is added to world.");
        playerCount++;
        return player;
    };

    my.ProcessWorld = function (deltaTime) {
        try {
            world.step(config.server.serverProcessFrequency, deltaTime, config.server.maxSubSteps);
        } catch (e) {
            logger.error("Error occurred at world.step(). message: ", e);
        };

        processPlayerMovementsAndRotations();

        clearBodyRemovalList();

        utils.timerMechanics.executeByIntervalFromSeconds(totalElapsedTimeFromSeconds, config.server.quePositionAndRotationDataFrequencyFromSeconds, quePositionAndRotationData);
        utils.timerMechanics.executeByIntervalFromSeconds(totalElapsedTimeFromSeconds, config.server.positionAndRotationUpdateFrequencyFromSeconds, sendPosAndRotData);
    };

    my.UpdateTotalElapsedTimeFromSeconds = function (elapsedTime) {
        totalElapsedTimeFromSeconds = elapsedTime;
    };
    
    my.GetPlayerList = function () {
        var playerList = []; 
        if (playerCount > 0) {
            for (var i = 0; i < world.bodies.length; i++) {
                var body = world.bodies[i];
                if (body.type = constants.game.player.type) {
                    var player = body;
                    playerList.push(player.clientInfo);            
                }
            };
        }

        return playerList;
    };

    my.Init = function (_world) {
        world = _world;
    };

    return my;
} (GameManager || {}));

module.exports = GameManager;