const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');

module.exports = class HelpCommand extends BaseCommand {
    constructor() {
        super('info', 'miscellaneous', []);
    }

    async run(client, message, args) {
        try {
            StateManager.getConnection().query(
                `SELECT cmdPrefix, adminRole, modLogId FROM GuildConfigurable WHERE guildId='${message.guild.id}'`
            ).then(result => {
                message.channel.send(`Bot d'Haskaris\nEn construction :slight_smile:\n`);
                const cmdPrefix = result[0][0].cmdPrefix;
                const adminRole = result[0][0].adminRole;
                const modLogId = result[0][0].modLogId;
                message.channel.send(`Commande d'invocation:'${cmdPrefix}'\nRole admin:'${adminRole}'\nID Log moderation:'${modLogId}'\n`);
            }).catch(err => {
                console.log("Problème lors de la requête (select)");
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    }
}