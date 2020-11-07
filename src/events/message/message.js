const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

module.exports = class MessageEvent extends BaseEvent {
    constructor() {
        super('message');
    }

    async run(client, message) {
        if (message.author.bot) return;

        //L'auteur est dans la liste des shhh donc on le supprime
        if (StateManager.getShhh().get(message.guild.id) != null) {
            if (StateManager.getShhh().get(message.guild.id).indexOf(message.author.id) != -1) {
                message.delete();
            }
        }

        const prefix = StateManager.getPrefix().get(message.guild.id);
        const usedPrefix = message.content.slice(0, prefix.length);

        if (prefix === usedPrefix) {
            const [ cmdName, ...cmdArgs ] = message.content.slice(prefix.length).split(/\s+/);
            const command = client.commands.get(cmdName);
            if (command) {
                command.run(client, message, cmdArgs);
            }
        }
    }
}