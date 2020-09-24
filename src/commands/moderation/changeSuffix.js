const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');

const guildAdminRole = new Map();

module.exports = class ChangeSuffixCommand extends BaseCommand {
    constructor() {
        super('chsuffix', 'admin', []);
        this.connection = StateManager.connection;
    }

    async run(client, message, args) {
        //Si le propriétaire du serveur a envoyé le message
        if (message.member.roles.cache.some(r => guildAdminRole.get(message.guild.id) === r.name)
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
                            this.connection.query(
                                `UPDATE GuildConfigurable SET nameSuffix='${newSuffix}' WHERE guildId='${message.guild.id}'`
                            );
                            StateManager.emit('nameSuffix', message.guild.id, newSuffix);
                            message.channel.send(`Mise à jour avec succes ! :ok_hand:`);
                        } catch (err) {
                            console.log(err);
                        };
                    } else {
                        message.channel.send(`Il manque l'appostrophe de fin`);
                    }
                } else {
                    message.channel.send(`Il manque l'appostrophe de début`);
                }
            } else {
                message.channel.send(`Il manque le suffix`);
            }
        } else {
            message.channel.send(`HOP HOP HOP TU FAIS QUOI LA COUSIN ?`);
        }
    }
}

StateManager.on('adminRoleFetched', (guildId, role) => {
    guildAdminRole.set(guildId, role);
});
StateManager.on('adminRoleUpdated', (guildId, role) => {
    guildAdminRole.set(guildId, role);
});