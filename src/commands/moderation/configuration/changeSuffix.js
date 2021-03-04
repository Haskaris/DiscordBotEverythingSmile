const BaseCommand = require('../../../utils/structures/BaseCommand');
const StateManager = require('../../../utils/StateManager');

module.exports = class ChangeSuffixCommand extends BaseCommand {
    constructor() {
        super('changesuffix', 'moderation', ['chs', 'chsuffix']);
    }

    async run(client, message, args) {
        //Si le propriétaire du serveur a envoyé le message
        if (message.member.roles.cache.some(r => StateManager.getAdminRole().get(message.guild.id) === r.name)
            || (message.member.id === message.guild.ownerID)) {
            //S'il y a un argument
            if (args.length) {
                if (args[0].startsWith('\'')) {
                    if (args[args.length - 1][args[args.length - 1].length - 1] == '\'') {
                        let newSuffix = "";
                        args.forEach(element => {
                            newSuffix = newSuffix.concat(element, " ");
                        });
                        newSuffix = newSuffix.slice(1, newSuffix.length - 2);
                        try {
                            await StateManager.getConnection().query(
                                `UPDATE GuildConfigurable SET nameSuffix='${newSuffix}' WHERE guildId='${message.guild.id}'`
                            );
                            StateManager.suffixUpdated(message.guild.id, newSuffix);
                            message.reply(`Mise à jour avec succes ! :ok_hand:`);
                        } catch (err) {
                            console.log(err);
                        };
                        return;
                    }
                }
            }
            message.reply(`Utilisation : changesuffix '<NOUEVAU_SUFFIX>'`);
        } else {
            message.reply(`Tu n'as pas le droit de modifier le suffix. :confused:`);
        }
    }
}