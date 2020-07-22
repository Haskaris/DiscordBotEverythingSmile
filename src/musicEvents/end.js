const BaseEvent = require('../utils/structures/BaseEvent');

module.exports = class QueueEndEvent extends BaseEvent {
    constructor() {
        super('queueEnd');
    }

    async run(client, player, track) {
        player.textChannel.send("Queue has ended.");
        client.music.players.destroy(player.guild.id);
    }
}