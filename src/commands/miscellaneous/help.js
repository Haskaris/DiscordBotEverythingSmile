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
        // Set the title of the field
        .setTitle('Liste des commandes')
        // Set the main content of the embed
        .addFields(
            { name: 'shhh <u>', value: 'Censure un utilisateur' },
            { name: 'unshhh <u>', value: 'Dé-censure un utilisateur' },
            { name: 'lvl', value: 'Donne le niveau de l\'utilisateur' },
            { name: 'help', value: 'Donne toutes les commandes disponibles' },
            { name: 'info', value: 'Donne toutes les données du serveur présente dans la base de donnée' },
            { name: 'chprefix <p>', value: 'Change le prefix d\'invocation\n(Modérateur)' },
            { name: 'chsuffix <s>', value: 'Change le suffix d\'ajout lorsqu\'une nouvelle personne rejoint le serveur\n(Modérateur)' },
            { name: 'setmodchannel <idChannel>', value: 'Change le channel où le bot va mettre les messages de modération\n(Modérateur)' },
            { name: 'setrolechannel <idChannel>', value: 'Change le channel de rôle\n(Modérateur)' },
            { name: 'setemojitorole <emoji> <idRole>', value: 'Associe un emoji à un rôle\n(Modérateur)' },
            { name: 'setadminrole <idRole>', value: 'Change le role administrateur\ni.e: le role pouvant utiliser le bot\n(Propriétaire)' },);
        // Send the embed to the same channel as the message
        message.channel.send(embed);
    }
}