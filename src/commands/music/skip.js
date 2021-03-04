const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

let USED = false;
module.exports = class SkipCommand extends BaseCommand {
    constructor() {
        super('skip', 'music', ['s']);
    }

    async run(client, message, args) {
        const { id } = message.guild;
        const player = client.music.players.get(id);
        const { channel } = message.member.voice;

        if (!player) {
            message.channel.send(`Client non connecté`);
            return;
        }

        if (!channel || channel.id != player.voiceChannel.id) {
            message.reply(`tu dois être dans le même channel vocal du client pour utiliser cette commande`);
            return;
        }

        //Récupère les utilisateurs sauf les robots
        const members = channel.members.filter(m => !m.user.bot);

        //Si l'utilisateur est seul
        if (members.size === 1) {
            player.stop();
            message.channel.send(`Skipping... ${player.queue[0].title}`);
        } else {
            if (!USED) {
                USED = true;
                const votesRequired = Math.ceil(members.size * .6) + 1; //+1 pour prendre en compte le bot
                const embed = new MessageEmbed()
                    .setDescription(`Total votes required to skip: ${votesRequired}`);
                const msg = await message.channel.send(embed);
                msg.react('🤮').then(r => {
                    msg.react('🥳');
                });

                const filter = (reaction, user) => {
                    if (user.bot)
                        return false;
                    const { channel } = message.guild.members.cache.get(user.id).voice;
                    if (channel) {
                        if (channel.id === player.voiceChannel.id) {
                            console.log(['🤮', '🥳'].includes(reaction.emoji.name));
                            return ['🤮', '🥳'].includes(reaction.emoji.name);
                        }
                        console.log("NON");
                        return false;
                    } else {
                        return false;
                    }
                }

                msg.awaitReactions(filter, { max: votesRequired-1, time: 10000, errors: ['time'] })
                .then(reactions => {
                    const totalVotes = reactions.get('🤮').users.cache.size;
                    if (totalVotes >= votesRequired) {
                        player.stop();
                        USED = false;
                    }
                }).catch( (error) => {
                    console.log(error);
                    USED = false;
                });
            } else {
                message.channel.send('Command cannot be used atm');
            }
        }
    }
}