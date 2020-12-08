const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class QueueCommand extends BaseCommand {
    constructor() {
        super('queue', 'music', ['q']);
    }

    async run(client, message, args) {

        if (!client.music.players.get(message.guild.id)) {
            message.reply(`le bot n'est pas lancé`);
            return;
        }

        let i = 0;

        //Faire une vérification avec les channels vocaux
        const player = client.music.players.get(message.guild.id);

        const tracksInfo = player.queue.map(r => `${++i}) ${r.title}`).join('\n');
        console.log(player.queue.length);
        //[0] correspond à la file d'attente des titres
        if (player.queue.length) {
            const embed = new MessageEmbed()
            .setColor(0x0099ff)
            .setTitle('File de musique')
            .addFields({name: 'Joue actuellement', value: `[${player.queue[0].title}](${player.queue[0].uri})`});
            
            if (player.queue.length > 1) {
                var file = "";
                for (let i = 1; i < player.queue.length; i++) {
                    file = `${i}. [${player.queue[i].title}](${player.queue[i].uri})\n`
                }
    
                embed.addFields({name: 'Musique à venir', value: file});
            }
            
            message.channel.send(embed);
        } else {
            message.reply(`rien a jouer`);
        }
    }
}