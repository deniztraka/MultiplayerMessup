var config = require('../../common/config.js');
var utils = require('../../common/utils.js');
var p2 = require('p2');
var player = function () {
    p2.Body.call(this, {
        mass: config.game.player.mass,
        position: [utils.math.randomInt(0, config.game.bounds.width), utils.math.randomInt(0, config.game.bounds.height)],
        type: p2.Body.DYNAMIC
    });
    var playerShape = new p2.Circle({ radius: config.game.player.radius });
    playerShape.collisionGroup = Math.pow(2, 0);
    playerShape.collisionMask = Math.pow(2, 0);
    this.addShape(playerShape);
    
    this.speed = config.game.player.speed;
    this.type = config.game.player.type;

    this.clientInfo = {
        id: this.id,
        position : {
            x: this.interpolatedPosition[0],
            y: this.interpolatedPosition[1]
        }       
    };
};

player.prototype = Object.create(p2.Body.prototype);

module.exports = player;