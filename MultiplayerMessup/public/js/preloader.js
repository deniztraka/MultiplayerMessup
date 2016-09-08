// Preloader will load all of the assets like graphics and audio
GameStates.Preloader = function (game) {
    this.preloadBar = null;
}

GameStates.Preloader.prototype = {
    preload: function () {
        // common to add a loading bar sprite here...
        this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);
        // load all game assets
        // images, spritesheets, atlases, audio etc..
        this.load.image('logo', '../public/assets/sprites/phaser2.png');
              
        this.load.image('player', '/public/assets/sprites/player/player.png');
        this.load.image('dirt', '/public/assets/sprites/tiles/dirt.png');
    },

    create: function () {
        //call next state
        this.state.start('SplashScreen');
    }
};