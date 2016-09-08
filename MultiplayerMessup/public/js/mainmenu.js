GameStates.MainMenu = function (game) {

};

GameStates.MainMenu.prototype = {
    create: function () {
       
        // create main menu text and images -
        // create a "Start Game" mechanism - variety of ways to do this...

        this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2, "write your name and press Enter to start", { font: "20px monospace", fill: "#fff" });
        this.loadingText.anchor.setTo(0.5, 0.5);

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.enterKey.onDown.add(this.playGame, this);

        this.myInput = this.createInput(this.game.width / 2 + 90, this.game.height / 2 - 50);
        this.myInput.anchor.set(0.5);
        this.myInput.canvasInput.focus(); 
    },    
    inputFocus: function (sprite) {
        sprite.canvasInput.focus();
    },
    createInput: function (x, y) {
        var bmd = this.add.bitmapData(400, 50);
        var myInput = this.game.add.sprite(x, y, bmd);

        myInput.canvasInput = new CanvasInput({
            canvas: bmd.canvas,
            fontSize: 12,
            fontFamily: 'Arial',
            fontColor: '#212121',
            fontWeight: 'bold',
            width: 200,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 3,
            boxShadow: '1px 1px 0px #fff',
            innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            placeHolder: 'enter your name here...'
        });
        myInput.inputEnabled = true;
        myInput.input.useHandCursor = true;
        myInput.events.onInputUp.add(this.inputFocus, this);
        return myInput;
    },
    playGame: function () {
        var playerName = $('input').val();
        this.state.start('Game', true, false, playerName);
    }
};