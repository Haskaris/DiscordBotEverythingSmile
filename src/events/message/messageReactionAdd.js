const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

module.exports = class MessageReactionAddEvent extends BaseEvent {
    constructor() {
        super('messageReactionAdd');
    }

    async run(client, reaction, user) {
        //Si la réaction est dans le channel de role
        //Alors c'est l'option de react2role
        const roleChannelId = StateManager.getRoleChannelId().get(reaction.message.guild.id);
        if (roleChannelId == reaction.message.channel.id) {
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
                `SELECT gre.roleId FROM GuildRoleEmoji gre, GuildConfigurable gc WHERE gre.guildId='${reaction.message.guild.id}' and gre.guildId = gc.guildId and gc.roleChannelId='${reaction.message.channel.id}' and gre.emoji='${reaction.emoji.id}'`
            ).then(result => {
                reaction.message.guild.members.fetch({ user, cache: true })
                .then(e => {
                    reaction.message.guild.roles.fetch({ cache: true });
                    reaction.message.guild.member(user).roles.add(reaction.message.guild.roles.cache.get(result[0][0].roleId));
                })
                .catch(console.error);
            });
        }
    }
}

