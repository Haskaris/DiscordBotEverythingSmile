const BaseCommand = require('../../../utils/structures/BaseCommand');
const StateManager = require('../../../utils/StateManager');

module.exports = class UnshhhCommand extends BaseCommand {
    constructor() {
        super('unshhh', 'miscellaneous', ['untg']);
    }

    async run(client, message, args) {
        if (args.length) {
            const users = message.mentions.users;
            users.forEach(u => {
                const member = message.guild.member(u);
                StateManager.shhhRemove(message.guild.id, member.id)
                message.channel.send(`${member} :partying_face:`)
            });
        } else {
            message.reply("Tu n'as mentionné personne à dé-taire !");
        }
    }
}