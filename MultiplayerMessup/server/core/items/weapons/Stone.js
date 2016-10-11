var config = require('../../../common/config.js');
var constants = require('../../../common/constants.js');
var utils = require('../../../common/utils.js');
var BaseWeapon = require('./BaseWeapon.js');
var p2 = require('p2');
var extend = require('extend');

module.exports = Stone;

function Stone(bodyOptions) {
    var self = this;
    var selfOptions = {
        mass: 0.1
    };
    extend(true, selfOptions, bodyOptions);
    BaseWeapon.call(self, selfOptions, "stone", "weapon");
    var stoneShape = new p2.Circle({ radius: 1 });
    //playerShape.collisionGroup = Math.pow(2, 0);
    //playerShape.collisionMask = Math.pow(2, 0);
    self.addShape(stoneShape);
    self.damping = 0.75;

    self.attack = function () { 
        console.log(self.iName + " attack");
    };
};

Stone.prototype = new Object(p2.Body.prototype);
Stone.prototype.constructor = Stone;
