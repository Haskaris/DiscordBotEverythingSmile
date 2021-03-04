const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

module.exports = class GuildDeleteEvent extends BaseEvent {
    constructor() {
        super('guildDelete');
    }

    async run(client, guild) {
        try {
            await StateManager.getConnection().query(
                `DELETE FROM Guilds WHERE id='${guild.id}'`
            );
            await StateManager.getConnection().query(
                `DELETE FROM GuildConfigurable WHERE guildId='${guild.id}'`
            );
            await StateManager.getConnection().query(
                `DELETE FROM GuildRoleEmoji WHERE guildId='${guild.id}'`
            );
            //Je ne supprilme pas la table d'XP
            //Choix à décider encore 
        } catch (err) {
            console.log("Problème de suppression dans la BDD");
            console.log(err);
        }
    }
}