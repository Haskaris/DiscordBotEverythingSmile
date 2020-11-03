const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

//Evenement lors de l'arrivée d'une personne
module.exports = class GuildMemberAddEvent extends BaseEvent {
    constructor() {
        super('guildMemberAdd');
    }

    async run(client, guildMember) {
        const guildId = guildMember.guild.id;
        const nameSuffix = StateManager.getSuffix().get(guildId);
        guildMember.setNickname(guildMember.user.username.concat(nameSuffix));
    }
}