const BaseCommand = require('../../../utils/structures/BaseCommand');
const StateManager = require('../../../utils/StateManager');

module.exports = class UpdateEmojiToRoleCommand extends BaseCommand {
    constructor() {
        super('updateemojitorole', 'moderation', ['uetr']);
    }

    async run(client, message, args) {
        //TODO
    }
}

