const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

module.exports = class MessageEvent extends BaseEvent {
    constructor() {
        super('message');
    }

    async run(client, message) {
        if (message.author.bot) return;

        //L'auteur est dans la liste des shhh donc on le supprime
        if (StateManager.getShhh().get(message.guild.id) != null) {
            if (StateManager.getShhh().get(message.guild.id).indexOf(message.author.id) != -1) {
                message.delete();
                //L'utilisateur n'a pas le droit de parler
                return;
            }
        }

        const prefix = StateManager.getPrefix().get(message.guild.id);
        const usedPrefix = message.content.slice(0, prefix.length);

        if (prefix === usedPrefix) {
            const [ cmdName, ...cmdArgs ] = message.content.slice(prefix.length).split(/\s+/);
            const command = client.commands.get(cmdName);
            if (command) {
                command.run(client, message, cmdArgs);
                //La commande existe donc pas d'xp gagné
                return;
            }
        }

        //Trouver une solution pour ne pas appeler la base à chaque fois
        try {
            StateManager.getConnection().query(
                `SELECT lvl, xp FROM XPTable WHERE guildId='${message.guild.id}' and memberId='${message.author.id}'`
            ).then(result => {
                console.log(result[0]);
                if (result[0].length == 0) {
                    //Le membre n'a pas de niveau dans la guild
                    //On le crée
                   try { 
                        StateManager.getConnection().query(
                            `INSERT INTO XPTable (guildId, memberId) VALUES ('${message.guild.id}','${message.author.id}')`
                        );
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    let lvl = result[0][0].lvl;
                    let xp = result[0][0].xp;
                    /* lvl -> xp required for next level -> next lvl
                     * 1 -> 50 -> 2
                     * 2 -> 100 -> 3
                     * 3 -> 150 -> 4
                     */
                    const xpRequired = lvl * 50
                    const xpOfThisMessage = Math.floor((Math.random() * 11) + 5)
                    xp = xp + xpOfThisMessage
                    if (xp >= xpRequired) {
                        xp = xp - xpRequired;
                        lvl = lvl + 1;
                        message.channel.send(`Et voilà ${message.author} qui passe lvl ${lvl} !! :partying_face:`);
                    }
                    //Le member a déjà un tuple à lui
                    try {
                        StateManager.getConnection().query(
                            `UPDATE XPTable SET xp='${xp}', lvl='${lvl}' WHERE guildId='${message.guild.id}' and memberId='${message.author.id}'`
                        );
                    } catch (err) {
                        console.log(err);
                    }
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