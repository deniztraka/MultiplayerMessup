var utils = require('./utils.js');
var colors = require('colors');
var config = require('./config.js');

module.exports = {
    debug: function (message) {
        if (config.server.logLevel >= 3) {
            console.log((utils.time.getDateTimeText()).gray + (" DEBUG ==> " + message).gray);
        }
    },

    info: function (message) {
        if (config.server.logLevel >= 2) {
            console.log((utils.time.getDateTimeText()).gray + (" INFO ==> " + message).white);
        }
    },

    audit: function (message) {
        if (config.server.logLevel >= 1) {
            console.log((utils.time.getDateTimeText()).gray + (" AUDIT ==> " + message).yellow);
        }
    },

    error: function (message, e) {
        console.log((utils.time.getDateTimeText()).gray + (" ERROR ==> " + message + " - ExMessage: " + e.message).red);
    }
};