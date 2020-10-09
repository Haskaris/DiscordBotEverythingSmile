const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');
const { Discord } = require('discord.js');

//Evenement lors de l'arrivée d'une personne
module.exports = class GuildMemberAddEvent extends BaseEvent {
    constructor() {
        super('guildMemberAdd');
        this.connection = StateManager.connection;
    }

    async run(client, guildMember) {
        this.connection.query(
            `SELECT nameSuffix FROM GuildConfigurable WHERE guildId='${guildMember.guild.id}'`
        ).then(result => {
            const guildId = guildMember.guild.id;
            const nameSuffix = result[0][0].nameSuffix;
            guildMember.setNickname(guildMember.user.username.concat(nameSuffix));
        }).catch(err => {
            console.log("Problème de suffix dans la BDD");
            console.log(err);
        });
    }
}