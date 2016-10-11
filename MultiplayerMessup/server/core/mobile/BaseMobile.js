var config = require('../../common/config.js');
var constants = require('../../common/constants.js');
var utils = require('../../common/utils.js');
var p2 = require('p2');
var extend = require('extend');

module.exports = BaseMobile;

function BaseMobile(bodyOptions, name, speed, bodyType) {
    var selfOptions = {};
    extend(true, selfOptions, bodyOptions);
    p2.Body.call(this, selfOptions);
    
    var self = this;
    
    self.zone = {
        x: Math.floor(self.position[0] / config.server.zoneSize.width),
        y: Math.floor(self.position[1] / config.server.zoneSize.height),
    };
    self.movementStates = {
        isMovingUp: false,
        isMovingDown: false,
        isMovingLeft: false,
        isMovingRight: false,
        isRunning: false
    };
    
    self.pName = name;
    self.pSpeed = speed;
    self.bodyType = bodyType;
    
    var weapons = [];
    var lastAttackTime = 0;
    var checkAttackRate = function () {
        var nextAttackTime = lastAttackTime + 0.5;
        if (nextAttackTime < self.world.time) {
            return true;
        }
        return false;
    };
    
    self.addWeapon = function (weapon) {
        if (weapon.bodyType == 'weapon') {
            weapons.push(weapon);
        }
    };
    
    self.attack = function () {
        if (checkAttackRate()) {
            if (weapons.length > 0) {
                weapons[0].attack();
                lastAttackTime = self.world.time;
            } else {
                console.log("no active weapon");
            }
            
        }
    };
    
    self.clientInfo = {
        id: self.id,
        name: self.pName,
        position: {
            x: self.position[0],
            y: self.position[1]
        }
    };
};

BaseMobile.prototype = new Object(p2.Body.prototype);
BaseMobile.prototype.constructor = BaseMobile;
