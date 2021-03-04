const BaseCommand = require('../../../utils/structures/BaseCommand');
const StateManager = require('../../../utils/StateManager');

module.exports = class ChangePrefixCommand extends BaseCommand {
    constructor() {
        super('changeprefix', 'moderation', ['chp', 'chprefix']);
    }

    async run(client, message, args) {
        //Si le propriétaire du serveur a envoyé le message
        //Ou si la personne qui a envoyé la requette possède le rôle d'aministration
        if (message.member.roles.cache.some(r => StateManager.getAdminRole().get(message.guild.id) === r.name)
            || (message.member.id === message.guild.ownerID)) {
            //S'il y a un argument
            if (args.length) {
                if (args[0].startsWith('\'')) {
                    if (args[args.length - 1][args[args.length - 1].length - 1] == '\'') {
                        let newPrefix = "";
                        args.forEach(element => {
                            newPrefix = newPrefix.concat(element, " ");
                        });
                        newPrefix = newPrefix.slice(1, newPrefix.length - 2);
                        try {
                            await StateManager.getConnection().query(
                                `UPDATE GuildConfigurable SET cmdPrefix='${newPrefix}' WHERE guildId='${message.guild.id}'`
                            );
                            StateManager.prefixUpdated(message.guild.id, newPrefix);
                            message.channel.send(`Mise à jour avec succes ! :ok_hand:`);
                        } catch (err) {
                            console.log(err);
                        };
                        return;
                    }
                }
            }
            message.reply(`Utilisation : changeprefix '<NOUVEAU_PREFIX>'`);
        } else {
            message.reply(`Tu n'as pas le droit de modifier le prefix. :confused:`);
        }
    }
}

