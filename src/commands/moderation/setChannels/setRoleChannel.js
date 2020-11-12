const BaseCommand = require('../../../utils/structures/BaseCommand');
const StateManager = require('../../../utils/StateManager');

module.exports = class SetRoleChannelCommand extends BaseCommand {
    constructor() {
        super('setrolechannel', 'moderation', ['src']);
    }

    async run(client, message, args) {
        //Si le propriétaire du serveur a envoyé le message
        if (message.member.roles.cache.some(r => StateManager.getAdminRole().get(message.guild.id) === r.name)
        || (message.member.id === message.guild.ownerID)) {
            if (args.length != 0) {
                StateManager.getConnection().query(
                    `UPDATE GuildConfigurable SET roleChannelId='${args[0]}' WHERE guildId='${message.guild.id}'`
                );
            } else {
                message.reply(`il manque l'id du channel`);
            }
        } else {
            message.reply(`Changement impossible pour ton role`);
        }
    }
}

