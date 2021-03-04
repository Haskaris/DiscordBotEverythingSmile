const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

const guildCmdPrefixes = new Map();

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
        this.connection = StateManager.connection;
    }

    async run(client) {
        console.log(`${client.user.tag} logged in.`);
        client.guilds.cache.forEach(guild => {
            this.connection.query(
                `SELECT cmdPrefix, adminRole FROM GuildConfigurable WHERE guildId='${guild.id}'`
            ).then(result => {
                const guildId = guild.id;
                const prefix = result[0][0].cmdPrefix;
                const adminRole = result[0][0].adminRole;
                guildCmdPrefixes.set(guildId, prefix);
                StateManager.emit('prefixFetched', guildId, prefix);
                StateManager.emit('adminRoleFetched', guildId, adminRole);
            }).catch(err => {
                console.log("Problème de préfix dans la BDD");
                console.log(err);
            });
        });
    }
}

