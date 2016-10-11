var config = require('../../common/config.js');
var constants = require('../../common/constants.js');
var utils = require('../../common/utils.js');
var BaseMobile = require('./BaseMobile.js');
var Stone = require('../items/weapons/Stone.js');
var p2 = require('p2');

module.exports = Player;



function Player(name) {
    var self = this;  
    BaseMobile.call(this, {
        mass: constants.game.player.mass,
        position: [utils.math.randomInt(0, config.game.bounds.width), utils.math.randomInt(0, config.game.bounds.height)]
    }, name, constants.game.player.speed, constants.game.player.type);
    var playerShape = new p2.Circle({ radius: constants.game.player.radius });
    //playerShape.collisionGroup = Math.pow(2, 0);
    //playerShape.collisionMask = Math.pow(2, 0);
    this.addShape(playerShape);
    this.damping = 1;        
    addDefaultWeapon(this);
    this.mousePosition = {
        x: 0,
        y: 0
    };
}

Player.prototype = new Object(BaseMobile.prototype);
Player.prototype.constructor = Player;

var addDefaultWeapon = function (player) {
    var weapon = new Stone({        
        position: [player.position[0], player.position[1]]
    });
    player.addWeapon(weapon);
};
