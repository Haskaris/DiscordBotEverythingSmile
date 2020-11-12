const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');

module.exports = class SetEmojiToRoleCommand extends BaseCommand {
    constructor() {
        super('setemojitorole', 'moderation', ['setr']);
    }

    async run(client, message, args) {
        if (message.member.roles.cache.some(r => StateManager.getAdminRole().get(message.guild.id) === r.name)
        || (message.member.id === message.guild.ownerID)) {
            //S'il y a un argument
            if (args.length == 4) {
                const idChannel = args[0];
                const idMessage = args[1];
                const emoji = args[2];
                const idRole = args[3];

                const channel = message.guild.channels.cache.get(idChannel);

                if (channel.type == 'text') {
                    channel.messages.fetch(idMessage).then(message => message.react(`${emoji}`));
                } else {
                    message.reply(`L'id du channel ne correspond pas à un channel textuel`);
                }
            } else {
                message.reply(`Nombre d'argument incorrect : id du channel puis id du message puis emoji puis id du role`);
            }
        } else {
            message.reply(`Seul le propriétaire du serveur peut changer le role de modérateur`);
        }
    }
}

