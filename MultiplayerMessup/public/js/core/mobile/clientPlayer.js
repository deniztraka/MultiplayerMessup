function ClientPlayer(game, serverId, nick, position, isLocal) {
    var nickNameTextStyle = style = { font: "10px Arial", fill: "#cccccc", wordWrap: true, wordWrapWidth: 80, align: "center" };

    this.playerSpriteVisibleHeight = 15;
    this.serverId = serverId;
    this.nickname = nick;
    this.sprite = game.add.sprite(position.x, position.y, 'player');
    this.sprite.anchor.setTo(0.5, 0.5);
    var nickNameText = game.add.text(position.x, position.y, this.nickname, style);
    nickNameText.anchor.setTo(0.5, 0.5);
    nickNameText.visible = !isLocal;
    this.nickNameText = nickNameText;
    this.isLocal = false;
}