const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

module.exports = class MessageDeleteEvent extends BaseEvent {
    constructor() {
        super('messageDelete');
    }

    async run(message) {
        console.log(`${message.id} was deleted!`);
        // Partial messages do not contain any content so skip them
        if (!message.partial) {
            console.log(`It had content: "${message.content}"`);
        }
    }
}