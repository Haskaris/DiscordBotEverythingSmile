const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
    }

    async run(client) {
        console.log(`${client.user.tag} - try to log in.`);
        client.guilds.cache.forEach(guild => {
            StateManager.getConnection().query(
                `SELECT cmdPrefix, adminRole, nameSuffix, roleChannelId FROM GuildConfigurable WHERE guildId='${guild.id}'`
            ).then(result => {
                const guildId = guild.id;
                const prefix = result[0][0].cmdPrefix;
                const nameSuffix = result[0][0].nameSuffix;
                const adminRole = result[0][0].adminRole;
                const roleChannelId = result[0][0].roleChannelId

                StateManager.prefixUpdated(guildId, prefix);
                StateManager.suffixUpdated(guildId, nameSuffix);
                StateManager.adminRoleUpdated(guildId, adminRole);

                //Met en cache le message dans le channel role
                //Il ne faut qu'un seul message pour ne pas surcharger le bot
                guild.channels.cache.forEach(channel => {
                    if (channel.id == roleChannelId) {
                        channel.messages.fetch();
                    }
                });

                guild.members.fetch();
                
            }).catch(err => {
                console.log("Problème d'initialisation des valeurs");
                console.log(err);
            });
        });
        console.log(`${client.user.tag} - logged in.`);
    }
}

