const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

module.exports = class GuildDeleteEvent extends BaseEvent {
    constructor() {
        super('guildDelete');
        this.connection = StateManager.connection;
    }

    async run(client, guild) {
        try {
            await this.connection.query(
                `DELETE FROM Guilds WHERE id='${guild.id}'`
            );
            await this.connection.query(
                `DELETE FROM GuildConfigurable WHERE guildId='${guild.id}'`
            );
        } catch (err) {
            console.log("Problème de suppression dans la BDD");
            console.log(err);
        }
    }
}