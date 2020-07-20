module.exports = class BaseCommand {
    constructor(name, category, aliases) {
        this.name = name;
        this.category = category;
        this.aliases = aliases;
    }

    async run(client, message, args) {
        message.channel.send(`Not implemented yet`);
    }
}