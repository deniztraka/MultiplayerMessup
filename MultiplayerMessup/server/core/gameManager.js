var _ = require('underscore');
var config = require('../common/config.js');
var constants = require('../common/constants.js');
var logger = require('../common/logger.js');
var utils = require('../common/utils.js');
var Player = require('./mobile/player.js');
var SocketCommandManager = require('./socketCommandManager.js');
var p2 = require('p2');
var GameManager = (function (my) {
    var io;
    var world;
    var bodyRemovalList = [];
    var bodyAdditionList = [];
    var playerSocketDictionary = {};
    
    var playerCount = 0;
    var totalElapsedTimeFromSeconds = 0;
    
    var processBodyRemovalList = function () {
        if (bodyRemovalList.length > 0) {
            for (var i = 0; i < bodyRemovalList.length; i++) {
                var body = bodyRemovalList[i];
                if (body.bodyType == constants.game.player.type) {
                    world.removeBody(body);
                    logger.audit(body.pName + " is removed from world.");
                    playerCount--;
                }
            }
            bodyRemovalList = [];
        }
    };
    var processbodyAdditionList = function () {
        if (bodyAdditionList.length > 0) {
            for (var i = 0; i < bodyAdditionList.length; i++) {
                var playerManager = bodyAdditionList[i];
                if (playerManager.player.bodyType == constants.game.player.type) {
                    world.addBody(playerManager.player);
                    playerSocketDictionary[playerManager.player.id] = [playerManager.player, playerManager.socket];
                    logger.audit(playerManager.player.pName + " is added to world.");
                    playerCount++;
                }
            }
            bodyAdditionList = [];
        }
    };
    
    var playersPositionsAndRotationsData = {};
    var quePositionAndRotationData = function () {
        
        if (playerCount > 0) {
            //logger.debug("que");
            for (var i = 0; i < world.bodies.length; i++) {
                var body = world.bodies[i];
                if (body.bodyType == constants.game.player.type) {
                    var player = body;
                    
                    if (playersPositionsAndRotationsData[player.id]) {
                        playersPositionsAndRotationsData[player.id].positions.push(
                            {
                                x: player.position[0],
                                y: player.position[1]
                            }
                        );
                        playersPositionsAndRotationsData[player.id].zones.push(player.zone);
                        playersPositionsAndRotationsData[player.id].rotations.push(player.angle);
                    } else {
                        playersPositionsAndRotationsData[player.id] = {
                            positions: [{
                                    x: player.position[0],
                                    y: player.position[1],
                                }],
                            rotations: [player.angle],
                            zones: [player.zone],
                            id: player.id
                        };
                    }
                }
            };
        }
    };
    
    var getClosePlayersData = function (player) {
        var data = {};
        for (var key in playersPositionsAndRotationsData) {
            
            var playerData = playersPositionsAndRotationsData[key];
            if (playerData.zones.length == 3) {
                var closeZonesArrayData = [
                    player.zone.x + "," + player.zone.y,
                    player.zone.x - 1 + "," + player.zone.y,
                    player.zone.x - 1 + "," + player.zone.y - 1,
                    player.zone.x + "," + player.zone.y - 1,
                    player.zone.x + 1 + "," + player.zone.y - 1,
                    player.zone.x + 1 + "," + player.zone.y,
                    player.zone.x + 1 + "," + player.zone.y + 1,
                    player.zone.x + "," + player.zone.y + 1,
                    player.zone.x - 1 + "," + player.zone.y + 1,
                ];
                
                var playerZonesArrayData = [
                    playerData.zones[0].x + "," + playerData.zones[0].y,
                    playerData.zones[1].x + "," + playerData.zones[1].y,
                    playerData.zones[2].x + "," + playerData.zones[2].y,
                ];
                
                
                var intersectionZones = _.intersection(closeZonesArrayData, playerZonesArrayData);
                if (intersectionZones.length > 0) {
                    data[key] = playersPositionsAndRotationsData[key];
                }
            }
        }
        return data;
    };
    
    var sendPosAndRotData = function () {
        
        if (playerCount > 0) {
            //logger.debug("send");
            if (config.server.vicinityUpdate) {
                //send for each player vicinity
                for (var key in playerSocketDictionary) {
                    var player = playerSocketDictionary[key][0];
                    if (player) {
                        var socket = playerSocketDictionary[key][1];
                        
                        var vicinityData = getClosePlayersData(player);
                        SocketCommandManager.UpdateClosePlayersPositionsAndRotations(socket, vicinityData);
                    }
                }
            } else {
                SocketCommandManager.UpdatePlayersPositionsAndRotations(playersPositionsAndRotationsData);
            }
        }
        playersPositionsAndRotationsData = {};
    };
    
    var setPlayerZone = function (player, isMovingHorizontal) {
        if (isMovingHorizontal) {
            player.zone.x = Math.floor(player.position[0] / config.server.zoneSize.width);
        } else {
            player.zone.y = Math.floor(player.position[1] / config.server.zoneSize.height);
        }
        //logger.debug("zone: {x: " + player.zone.x + ", y: " + player.zone.y + "}");
    };
    
    var processPlayerMovementsAndRotations = function () {
        if (playerCount > 0) {
            for (var i = 0; i < world.bodies.length; i++) {
                var body = world.bodies[i];
                if (body.bodyType == constants.game.player.type) {
                    var player = body;
                    
                    player.angle = Math.getAngle({ x: player.position[0], y: player.position[1] }, { x: player.mousePosition.x, y: player.mousePosition.y });
                    
                    var currentSpeed = player.pSpeed;
                    if (player.movementStates.isRunning) { 
                        currentSpeed = player.pSpeed * constants.game.player.runningSpeedMultiplier; 
                    }

                    if (player.movementStates.isMovingUp) {
                        //player.velocity[1] = -player.speed;
                        player.position[1] -= currentSpeed;                        
                        setPlayerZone(player, false);
                    }
                    if (player.movementStates.isMovingDown) {
                        //player.velocity[1] = player.speed;
                        player.position[1] += currentSpeed;
                        setPlayerZone(player, false);
                    }
                    
                    if (player.movementStates.isMovingLeft) {
                        //player.velocity[0] = -player.speed;
                        player.position[0] -= currentSpeed;
                        setPlayerZone(player, true);
                    }
                    if (player.movementStates.isMovingRight) {
                        //player.velocity[0] = player.speed;
                        player.position[0] += currentSpeed;
                        setPlayerZone(player, true);
                    }

                    player.previousPosition[0] = player.position[0];
                    player.previousPosition[1] = player.position[0];
                }
            };
        }
    };
    
    var onBeginContact = function (evt) {
        //logger.debug("collision occured.");
    };
    
    var onPostStep = function (evt) {
        processPlayerMovementsAndRotations();
        utils.timerMechanics.executeByIntervalFromSeconds(totalElapsedTimeFromSeconds, config.server.quePositionAndRotationDataFrequencyFromSeconds, quePositionAndRotationData);
        utils.timerMechanics.executeByIntervalFromSeconds(totalElapsedTimeFromSeconds, config.server.positionAndRotationUpdateFrequencyFromSeconds, sendPosAndRotData);

        processbodyAdditionList();
        processBodyRemovalList();
    };
    
    my.RemovePlayerFromWorld = function (player) {
        bodyRemovalList.push(player);
        delete playerSocketDictionary[player.id];
    };
    
    my.AddPlayerToWorld = function (playerManager) {      
        bodyAdditionList.push(playerManager);        
    };

    my.ProcessWorld = function (deltaTime) {        
        world.step(config.server.serverProcessFrequency, deltaTime, config.server.maxSubSteps);                            
    };
    
    my.UpdateTotalElapsedTimeFromSeconds = function (elapsedTime) {
        totalElapsedTimeFromSeconds = elapsedTime;
    };
    
    my.GetPlayerList = function () {
        var playerList = [];
        if (playerCount > 0) {
            for (var i = 0; i < world.bodies.length; i++) {
                var body = world.bodies[i];
                if (body.bodyType == constants.game.player.type) {
                    var player = body;
                    playerList.push(player.clientInfo);
                }
            };
        }
        
        return playerList;
    };
    
    my.Init = function () {
        // creating world
        world = new p2.World({
            gravity: [0, 0],
            islandSplit: true
        });
        world.solver = new p2.GSSolver();
        //world.solver.iterations = 5; // Fast, but contacts might look squishy...
        world.solver.iterations = 25;
        //world.solver.iterations = 50; // Slow, but contacts look good!
        world.solver.tolerance = 0.01;
        
        world.on('beginContact', onBeginContact);
        world.on('postStep', onPostStep);
    };
    
    return my;
}(GameManager || {}));

module.exports = GameManager;