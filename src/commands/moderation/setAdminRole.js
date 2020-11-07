const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');

module.exports = class SetAdminRoleCommand extends BaseCommand {
    constructor() {
        super('setadminrole', 'moderation', []);
    }

    //TODO: Vérifier que le role existe bien
    async run(client, message, args) {
        //Si le propriétaire du serveur a envoyé le message
        if (message.member.id === message.guild.ownerID) {
            //S'il y a un argument
            if (args.length) {
                if (args[0].startsWith('\'')) {
                    if (args[args.length - 1][args[args.length - 1].length - 1] == '\'') {
                        let newRole = "";
                        args.forEach(element => {
                            newRole = newRole.concat(element, " ");
                        });
                        newRole = newRole.slice(1, newRole.length - 2);
                        if (newRole.length > 0) {
                            try {
                                await StateManager.getConnection().query(
                                    `UPDATE GuildConfigurable SET adminRole='${newRole}' WHERE guildId='${message.guild.id}'`
                                );
                                StateManager.adminRoleUpdated(message.guild.id, newRole);
                                message.reply(`Role Admin mis à jour avec succes ! :ok_hand:`);
                            } catch (err) {
                                console.log(err);
                            };
                        } else {
                            message.reply(`Impossible d'assigner un role sans nom`);
                        }
                    } else {
                        message.reply(`Il manque l'appostrophe de fin`);
                    }
                } else {
                    message.reply(`Il manque l'appostrophe de début`);
                }
            } else {
                message.reply(`Il manque le role`);
            }
        } else {
            message.reply(`Seul le propriétaire du serveur peut changer le role de modérateur`);
        }
    }
}

