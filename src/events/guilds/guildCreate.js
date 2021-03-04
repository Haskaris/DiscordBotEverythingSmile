const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

module.exports = class GuildCreateEvent extends BaseEvent {
    constructor() {
        super('guildCreate');
    }

    async run(client, guild) {
        try {
            await StateManager.getConnection().query(
                `INSERT INTO Guilds VALUES ('${guild.id}','${guild.ownerID}')`
            );
            await StateManager.getConnection().query(
                `INSERT INTO GuildConfigurable (guildId) VALUES ('${guild.id}')`
            );
            //Changer 'wi ' par la valeur par défaut du mot d'invocation
            StateManager.prefixUpdated(guild.id, 'wi ');
        } catch (err) {
            console.log("Problème d'insertion dans la BDD");
            console.log(err);
        }
    }
}