const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class PlayCommand extends BaseCommand {
    constructor() {
        super('shuffle', 'music', ['sh']);
    }

    async run(client, message, args) {

        //Faire une vérification avec les channels vocaux
        const player = client.music.players.get(message.guild.id);
        shuffle(player.queue);
    }
}

/**
 * Shuffles array in place.
 * https://stackoverflow.com/a/6274381
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}