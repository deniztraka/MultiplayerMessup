// Boot will take care of initializing a few settings,

// declare the object that will hold all game states
var GameStates = {
    //quite common to add game variables/constants in here
};

GameStates.Boot = function (game) {  //declare the boot state
    
};

GameStates.Boot.prototype = {
    preload: function () {
        // load assets to be used later in the preloader e.g. for loading screen / splashscreen
        this.load.image('preloaderBar', '../public/assets/sprites/preloader-bar.png');        
    },
    create: function () {
        // setup game environment
        // scale, input etc..

        //$(window).resize(function () {
        //    resizeGame(this.game);
        //});
        //resizeGame(this.game);

        // call next state
        this.state.start('Preloader');
    }
};

//resizing utils
//function resizeGame(gameX) {
//    gameX.scale.setGameSize($(window).width(), $(window).height());
//}