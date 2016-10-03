var config = require('../../common/config.js');
var constants = require('../../common/constants.js');
var utils = require('../../common/utils.js');
var p2 = require('p2');

module.exports = TestPlayer;

function TestPlayer(name) {    
    p2.Body.call(this, {
        mass: constants.game.player.mass,
        position: [utils.math.randomInt(0, config.game.bounds.width), utils.math.randomInt(0, config.game.bounds.height)],
        angularVelocity: 200
    });
    var playerShape = new p2.Circle({ radius: constants.game.player.radius });
    //playerShape.collisionGroup = Math.pow(2, 0);
    //playerShape.collisionMask = Math.pow(2, 0);
    this.addShape(playerShape);

    this.mousePosition = {
        x: 0,
        y: 0
    };
    this.zone = {
        x: Math.floor(this.position[0] / config.server.zoneSize.width),
        y: Math.floor(this.position[1] / config.server.zoneSize.height),
    };
    this.movementStates = {
        isMovingUp: false,
        isMovingDown: false,
        isMovingLeft: false,
        isMovingRight: false
    };
    
    this.pName = name;
    this.pSpeed = constants.game.player.speed;
    this.bodyType = constants.game.player.type;

    this.clientInfo = {
        id: this.id,
        name: this.pName,
        position: {
            x: this.position[0],
            y: this.position[1]
        }
    };
}

TestPlayer.prototype = new Object(p2.Body.prototype);
TestPlayer.prototype.constructor = TestPlayer;
