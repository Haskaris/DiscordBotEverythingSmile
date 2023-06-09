const BaseCommand = require('../../../utils/structures/BaseCommand');
const StateManager = require('../../../utils/StateManager');

module.exports = class ShhhCommand extends BaseCommand {
    constructor() {
        super('shhh', 'miscellaneous', ['tg']);
    }

    //Il envoie le message en double ?
    async run(client, message, args) {
        if (args.length) {
            const users = message.mentions.users;
            users.forEach(u => {
                const member = message.guild.member(u);
                StateManager.shhhUpdated(message.guild.id, member.id);
                message.channel.send(`${member} :shushing_face:`);
            });
        } else {
            message.reply("Tu n'as pas mentionné de personne à taire ! :shushing_face:");
        }
    }
}