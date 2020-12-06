const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class JoinCommand extends BaseCommand {
    constructor() {
        super('join', 'music', ['j']);
    }

    async run(client, message, args) {

        if (message.member.voice.channel) {
            if (client.music.players.size < 5) {
                const player = client.music.players.spawn({
                    guild: message.guild,
                    voiceChannel: message.member.voice.channel,
                    textChannel: message.channel
                });
            } else {
                message.reply(`je ne pensais pas que ce bot serait si connu...\nLa connexion du bot est surchargé\nFaut contacter Haskaris#3930`)
            }
        } else {
            message.reply(`il faut rejoindre un channel`);
        }
    }
}