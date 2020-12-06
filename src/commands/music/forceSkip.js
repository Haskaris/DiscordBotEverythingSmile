const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

let USED = false;
module.exports = class ForceSkipCommand extends BaseCommand {
    constructor() {
        super('forceskip', 'music', ['fs']);
    }

    async run(client, message, args) {
        const { id } = message.guild;
        const player = client.music.players.get(id);
        const { channel } = message.member.voice;

        if (!player) {
            message.channel.send(`Client non connecté`);
            return;
        }

        if (!channel || channel.id != player.voiceChannel.id) {
            message.reply(`tu dois être dans le même channel vocal du client pour utiliser cette commande`);
            return;
        }

        player.stop();
        message.channel.send(`Skipping... ${player.queue[0].title}`);
    }
}