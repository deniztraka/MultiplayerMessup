module.exports = {
    math: {
        //This function generates floating-point between two numbers low (inclusive) and high (exclusive)([low, high))
        random: function random(low, high) {
            return Math.random() * (high - low) + low;
        },
        //This function generates random integer between two numbers low (inclusive) and high (exclusive) ([low, high))
        randomInt : function (low, high) {
            return Math.floor(Math.random() * (high - low) + low);
        },
        //This function generates random integer between two numbers low (inclusive) and high (inclusive) ([low, high])
        randomIntInc : function (low, high) {
            return Math.floor(Math.random() * (high - low + 1) + low);
        }
    }
};