const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class QueueCommand extends BaseCommand {
    constructor() {
        super('queue', 'music', ['q']);
    }

    async run(client, message, args) {
        let i = 0;

        //Faire une vérification avec les channels vocaux
        const player = client.music.players.get(message.guild.id);

        const tracksInfo = player.queue.map(r => `${++i}) ${r.title}`).join('\n');
        const embed = new MessageEmbed()
            .setTitle('Music Result')
            .setDescription(tracksInfo);
        
        message.channel.send(embed);
    }
}