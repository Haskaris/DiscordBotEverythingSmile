const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');
const { MessageEmbed } = require('discord.js');

module.exports = class InfoCommand extends BaseCommand {
    constructor() {
        super('info', 'miscellaneous', []);
    }

    //TODO Réussir à supprimer la commande select
    async run(client, message, args) {
        try {
            StateManager.getConnection().query(
                `SELECT modChannelId FROM GuildConfigurable WHERE guildId='${message.guild.id}'`
            ).then(result => {
                const guildId = message.guild.id;
                var modChannelId = "Aucun";
                if (result[0][0].modChannelId) {
                    modChannelId = result[0][0].modChannelId;
                }
                
                const embed = new MessageEmbed()
                // Set the color of the embed
                .setColor(0x0099ff)
                .setAuthor('Haskaris')
                // Set the title of the field
                .setTitle('Liste des informations retenues (qui peuvent être utile) dans la base de donnée')
                // Set the main content of the embed
                .addFields(
                    { name: `Commande d'invocation`, value: `'${StateManager.getPrefix().get(guildId)}'` },
                    { name: `Suffix à ajouter`, value: `'${StateManager.getSuffix().get(guildId)}'` },
                    { name: `Role admin`, value: `${StateManager.getAdminRole().get(guildId)}` },
                    { name: `ID de log de moderation`, value: `${modChannelId}` },);
                // Send the embed to the same channel as the message
                message.channel.send(embed);
            }).catch(err => {
                console.log("Problème lors de la requête (select)");
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    }
}