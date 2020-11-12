const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
    }

    async run(client) {
        console.log(`${client.user.tag} logged in.`);
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

                guild.channels.cache.forEach(channel => {
                    if (channel.id == roleChannelId) {
                        channel.messages.fetch();
                    }
                });
                
            }).catch(err => {
                console.log("Problème d'initialisation dans la BDD");
                console.log(err);
            });
        });
    }
}

