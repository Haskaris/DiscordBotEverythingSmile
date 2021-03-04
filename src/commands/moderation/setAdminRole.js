const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');

module.exports = class SetAdminRoleCommand extends BaseCommand {
    constructor() {
        super('setadminrole', 'owner', []);
        this.connection = StateManager.connection;
    }

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
                                this.connection.query(
                                    `UPDATE GuildConfigurable SET adminRole='${newRole}' WHERE guildId='${message.guild.id}'`
                                );
                                StateManager.emit('adminRoleUpdated', message.guild.id, newRole);
                                message.channel.send(`Role Admin mis à jour avec succes ! :ok_hand:`);
                            } catch (err) {
                                console.log(err);
                            };
                        } else {
                            message.channel.send(`Impossible d'assigner un role sans nom.`);
                        }
                    } else {
                        message.channel.send(`Il manque l'appostrophe de fin.`);
                    }
                } else {
                    message.channel.send(`Il manque l'appostrophe de début.`);
                }
            } else {
                message.channel.send(`Il manque le role.`);
            }
        } else {
            message.channel.send(`Seul le propriétaire du serveur peut changer le role de modérateur.`);
        }
    }
}