const BaseCommand = require('../../../utils/structures/BaseCommand');
const StateManager = require('../../../utils/StateManager');

module.exports = class SetEmojiToRoleCommand extends BaseCommand {
    constructor() {
        super('setemojitorole', 'moderation', ['setr']);
    }

    async run(client, message, args) {
        if (message.member.roles.cache.some(r => StateManager.getAdminRole().get(message.guild.id) === r.name)
        || (message.member.id === message.guild.ownerID)) {
            //S'il y a un argument
            //Un message doit être présent, et la commande setrolechannel déjà effectuée
            if (args.length == 2) {
                const emoji = args[0];
                const idRole = args[1];

                StateManager.getConnection().query(
                    `SELECT roleChannelId FROM GuildConfigurable WHERE guildId='${message.guild.id}'`
                ).then(result => {
                    const guildId = message.guild.id;
                    const roleChannelId = result[0][0].roleChannelId;
                    if (roleChannelId == null) {
                        message.reply(`Il n'y a pas de channel de role dans ce serveur...\nEst-ce que la commande \`\`setrolechannel\`\` a bien été éffectuée ?`);
                        return;
                    }

                    const channel = message.guild.channels.cache.get(roleChannelId);

                    try { 
                        StateManager.getConnection().query(
                            `INSERT INTO GuildRoleEmoji (guildId, roleId, emoji) VALUES ('${guildId}','${idRole}','${emoji}')`
                        );
                        //Ne fonctionne que s'il y a qu'un message !!

                        //value[0] = première clé
                        //value[1] = première valeur
                        channel.messages.cache.entries().next().value[1].react(`${emoji}`);
                    } catch (err) {
                        //Le insert s'est probablement mal passé car la clé primaire existe déjà
                        message.reply(`Un emoji est déjà assigné à ce rôle.`);
                    }
                });
            } else {
                message.reply(`Nombre d'argument incorrect : id du channel puis id du message puis emoji puis id du role`);
            }
        } else {
            message.reply(`Seul le propriétaire du serveur peut changer le role de modérateur`);
        }
    }
}

