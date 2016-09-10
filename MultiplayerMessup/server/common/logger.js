var utils = require('./utils.js');
var colors = require('colors');

module.exports = {
    info: function (message) {
        console.log((utils.time.getDateTimeText()).gray + (" INFO ==> " + message).white);
    },

    error: function (message, e) {
        console.log((utils.time.getDateTimeText()).gray + (" ERROR ==> " + message + " - ExMessage: " + e.message).red);
    }
};