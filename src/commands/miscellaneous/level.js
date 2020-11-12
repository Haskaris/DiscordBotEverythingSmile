const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');

module.exports = class LevelCommand extends BaseCommand {
    constructor() {
        super('level', 'miscellaneous', ['lvl']);
    }

    async run(client, message, args) {
        const guildId = message.guild.id;
        const authorId = message.author.id;
        try {
            StateManager.getConnection().query(
                `SELECT lvl, xp FROM XPTable WHERE guildId='${guildId}' and memberId='${authorId}'`
            ).then(result => {
                if (result[0].length == 0) {
                    //Le membre n'a pas de niveau dans la guild
                    message.channel.send(`Niveau courant 1\nExperience courante 0\n Experience pour le niveau suivant 50`);  
                } else {
                    const lvl = result[0][0].lvl;
                    const xp = result[0][0].xp;
                    const xpRequired = lvl * 50
                    message.channel.send(`Niveau courant ${lvl}\nExperience courante ${xp}/${xpRequired}`);
                }
            }).catch(err => {
                console.log("Problème lors de la requête (select)");
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    }
}