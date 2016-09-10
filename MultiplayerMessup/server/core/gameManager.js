﻿var config = require('../common/config.js');
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

    var sendPosData = function () {
        if (playerCount > 0) {
            var playerPositionsData = {};

            for (var i = 0; i < world.bodies.length; i++) {
                var body = world.bodies[i];
                if (body.type = constants.game.player.type) {
                    var player = body;

                    playerPositionsData[player.id] = {
                        position: {
                            x: player.position[0],
                            y: player.position[1],
                        },
                        id: player.id
                    };
                }
            };

            SocketCommandManager.UpdatePlayersPositions(playerPositionsData);
            
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

        clearBodyRemovalList();

        utils.timerMechanics.executeByIntervalFromSeconds(totalElapsedTimeFromSeconds, config.server.positionUpdateFrequencyFromSeconds, sendPosData);
    };

    my.UpdateTotalElapsedTimeFromSeconds = function (elapsedTime) {
        totalElapsedTimeFromSeconds = elapsedTime;
    };

    my.Init = function (_world) {
        world = _world;
    };

    return my;
} (GameManager || {}));

module.exports = GameManager;