var config = require('../../common/config.js');
var constants = require('../../common/constants.js');
var utils = require('../../common/utils.js');
var p2 = require('p2');

module.exports = BaseMobile;

function BaseMobile(bodyOptions,name,speed,bodyType) {
    var selfOptions = bodyOptions;
    p2.Body.call(this, selfOptions);

    this.zone = {
        x: Math.floor(this.position[0] / config.server.zoneSize.width),
        y: Math.floor(this.position[1] / config.server.zoneSize.height),
    };
    this.movementStates = {
        isMovingUp: false,
        isMovingDown: false,
        isMovingLeft: false,
        isMovingRight: false,
        isRunning: false
    };

    this.pName = name;
    this.pSpeed = speed;
    this.bodyType = bodyType;

    this.clientInfo = {
        id: this.id,
        name: this.pName,
        position: {
            x: this.position[0],
            y: this.position[1]
        }
    };
};

BaseMobile.prototype = new Object(p2.Body.prototype);
BaseMobile.prototype.constructor = BaseMobile;
