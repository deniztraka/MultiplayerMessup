var phaserGame;
window.onload = function () {

    phaserGame = new Phaser.Game("100%", "100%", Phaser.CANVAS, 'content');

    //  Add the States your game has.
    phaserGame.state.add('Boot', GameStates.Boot);
    phaserGame.state.add('Preloader', GameStates.Preloader);
    phaserGame.state.add('SplashScreen', GameStates.SplashScreen);
    phaserGame.state.add('MainMenu', GameStates.MainMenu);
    phaserGame.state.add('Game', GameStates.Game);

    //  Now start the Boot state.
    phaserGame.state.start('Boot');

};