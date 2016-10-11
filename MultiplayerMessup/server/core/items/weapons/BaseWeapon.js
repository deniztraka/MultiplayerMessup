var config = require('../../../common/config.js');
var constants = require('../../../common/constants.js');
var utils = require('../../../common/utils.js');
var BaseItem = require('../BaseItem.js');
var p2 = require('p2');
var extend = require('extend');

module.exports = BaseWeapon;

function BaseWeapon(bodyOptions, name, bodyType) {
    var selfOptions = {};
    extend(true, selfOptions, bodyOptions);
    BaseItem.call(this, selfOptions, name, bodyType);

    this.attack = function() { 
        console.log(this.name + " - implement attack function in super.");
    }

};

BaseWeapon.prototype = new Object(p2.Body.prototype);
BaseWeapon.prototype.constructor = BaseWeapon;
