const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

//Evenement lors de la sortie d'une personne
module.exports = class GuildMemberRemove extends BaseEvent {
    constructor() {
        super('guildMemberRemove');
    }

    async run(client, guildMember) {
        //Rien à faire
    }
}