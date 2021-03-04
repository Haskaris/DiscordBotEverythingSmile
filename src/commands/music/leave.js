const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LeaveCommand extends BaseCommand {
    constructor() {
        super('leave', 'music', ['l']);
    }

    //Si le client est déconnecté, ça marche pas car le client n'est pas détruit
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

        client.music.players.destroy(id);
        message.channel.send(`Client bien déconnecté`);
    }
}