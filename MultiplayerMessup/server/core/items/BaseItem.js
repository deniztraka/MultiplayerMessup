var config = require('../../common/config.js');
var constants = require('../../common/constants.js');
var utils = require('../../common/utils.js');
var p2 = require('p2');
var extend = require('extend');

module.exports = BaseItem;

function BaseItem(bodyOptions, name, bodyType) {
    var selfOptions = {};
    extend(true, selfOptions, bodyOptions);
    p2.Body.call(this, selfOptions);
    
    this.zone = {
        x: Math.floor(this.position[0] / config.server.zoneSize.width),
        y: Math.floor(this.position[1] / config.server.zoneSize.height),
    };

    
    this.iName = name;    
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

BaseItem.prototype = new Object(p2.Body.prototype);
BaseItem.prototype.constructor = BaseItem;
