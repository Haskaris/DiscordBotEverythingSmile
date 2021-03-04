module.exports = class BaseEvent {
    constructor(name) {
        this.name = name;
    }
    
    async run(client, message, args) {
        message.channel.send(`Event not implemented yet`);
    }
}