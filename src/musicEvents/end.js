const BaseEvent = require('../utils/structures/BaseEvent');

module.exports = class QueueEndEvent extends BaseEvent {
    constructor() {
        super('queueEnd');
    }

    async run(client, player, track) {
        player.textChannel.send("Plus de musique à jouer");
        //client.music.players.destroy(player.guild.id);
    }
}