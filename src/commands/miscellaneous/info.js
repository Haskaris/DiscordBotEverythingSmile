const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');

module.exports = class InfoCommand extends BaseCommand {
    constructor() {
        super('info', 'miscellaneous', []);
    }

    //TODO Réussir à supprimer la commande select
    async run(client, message, args) {
        try {
            StateManager.getConnection().query(
                `SELECT modLogId FROM GuildConfigurable WHERE guildId='${message.guild.id}'`
            ).then(result => {
                const guildId = message.guild.id;
                const modLogId = result[0][0].modLogId;
                message.channel.send(`
                En construction\n
                Commande d'invocation: ${StateManager.getPrefix().get(guildId)}\n
                Role admin: ${StateManager.getAdminRole().get(guildId)}\n
                ID Log moderation:'${modLogId}'\n`);
            }).catch(err => {
                console.log("Problème lors de la requête (select)");
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    }
}