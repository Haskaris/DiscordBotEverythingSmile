const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

module.exports = class MessageReactionRemoveEvent extends BaseEvent {
    constructor() {
        super('messageReactionRemove');
    }

    async run(client, reaction, user) {
        if (user.id === client.user.id) return;
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message: ', error);
                return;
            }
        }

        StateManager.getConnection().query(
            `SELECT roleId, emoji FROM GuildRoleEmoji WHERE guildId='${reaction.message.guild.id}' and roleChannelId='${reaction.message.channel.id}' and messageId='${reaction.message.id}'`
        ).then(result => {
            reaction.message.guild.members.fetch({ user, cache: true })
            .then(e => {
                reaction.message.guild.roles.fetch({ cache: true });
                reaction.message.guild.member(user).roles.remove(reaction.message.guild.roles.cache.get(result[0][0].roleId));
            })
            .catch(console.error);
        });
    }
}

