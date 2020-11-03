const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

/**
 * Garder la liste des commandes à jour
 */
module.exports = class HelpCommand extends BaseCommand {
    constructor() {
        super('help', 'miscellaneous', []);
    }

    //Envoi de la liste des commandes
    async run(client, message, args) {

        const embed = new MessageEmbed()
        // Set the color of the embed
        .setColor(0x0099ff)
        .setAuthor('Haskaris')
        // Set the title of the field
        .setTitle('Liste des commandes')
        // Set the main content of the embed
        .addFields(
            { name: 'help', value: 'Donne toutes les commandes disponibles' },
            { name: 'info', value: 'Donne toutes les données du serveur présente dans la base de donnée' },
            { name: 'chprefix', value: 'Change le prefix d\'invocation' },
            { name: 'chsuffix', value: 'Change le suffix d\'ajout lorsqu\'une nouvelle personne rejoint le serveur' },
            { name: 'setadminrole', value: 'Change le role administrateur\ni.e: le role pouvant utiliser le bot\n/!\\Seul le propriétaire du serveur peut utiliser cette commande' },);
        // Send the embed to the same channel as the message
        message.channel.send(embed);
    }
}