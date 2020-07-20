const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

module.exports = class GuildCreateEvent extends BaseEvent {
    constructor() {
        super('guildCreate');
        this.connection = StateManager.connection;
    }

    async run(client, guild) {
        try {
            await this.connection.query(
                `INSERT INTO Guilds VALUES ('${guild.id}','${guild.ownerID}')`
            );
            await this.connection.query(
                `INSERT INTO GuildConfigurable (guildId) VALUES ('${guild.id}')`
            );
        } catch (err) {
            console.log("Problème d'insertion dans la BDD");
            console.log(err);
        }
    }
}