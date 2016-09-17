function ClientPlayer(game, serverId, nick, position) {
    this.serverId = serverId;
    this.nickname = nick;
    this.sprite = game.add.sprite(position.x, position.y, 'player');
    this.sprite.anchor.setTo(0.5, 0.5);
}