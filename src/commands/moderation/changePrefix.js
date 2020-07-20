const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');

module.exports = class ChangePrefixCommand extends BaseCommand {
    constructor() {
        super('chprefix', 'owner', []);
        this.connection = StateManager.connection;
    }

    async run(client, message, args) {
        //Si le propriétaire du serveur a envoyé le message
        if (message.member.id === message.guild.ownerID) {
            //S'il y a un argument
            if (args.length) {
                if (args[0].startsWith('\'')) {
                    if (args[args.length - 1][args[args.length - 1].length - 1] == '\'') {
                        let newPrefix = "";
                        args.forEach(element => {
                            newPrefix = newPrefix.concat(element, " ");
                        });
                        newPrefix = newPrefix.slice(1, newPrefix.length - 2);
                        console.log(newPrefix);
                        try {
                            this.connection.query(
                                `UPDATE GuildConfigurable SET cmdPrefix='${newPrefix}' WHERE guildId='${message.guild.id}'`
                            );
                            StateManager.emit('prefixUpdate', message.guild.id, newPrefix);
                            message.channel.send(`Mise à jour avec succes ! :ok_hand:`);
                        } catch (err) {
                            console.log(err);
                        };
                    } else {
                        message.channel.send(`Il manque l'appostrophe de fin`);
                    }
                } else {
                    message.channel.send(`Il manque l'appostrophe de début`);
                }
            } else {
                message.channel.send(`Il manque le prefix`);
            }
        } else {
            message.channel.send(`HOP HOP HOP TU FAIS QUOI LA COUSIN ?`);
        }
    }
}