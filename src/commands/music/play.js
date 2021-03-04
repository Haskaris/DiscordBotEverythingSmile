const BaseCommand = require('../../utils/structures/BaseCommand');
//const { MessageEmbed } = require('discord.js');
const Builder = require('../../utils/builder');

module.exports = class PlayCommand extends BaseCommand {
    constructor() {
        super('play', 'music', ['p']);
    }

    async run(client, message, args) {
        
        var player;
        const { channel } = message.member.voice;
        
        if (!client.music.players.get(message.guild.id)) {
            //TODO: Factoriser
            if (message.member.voice.channel) {
                if (client.music.players.size < 5) {
                    player = client.music.players.spawn({
                        guild: message.guild,
                        voiceChannel: message.member.voice.channel,
                        textChannel: message.channel
                    });
                } else {
                    message.reply(`je ne pensais pas que ce bot serait si connu...\nLa connexion du bot est surchargé\nFaut contacter Haskaris#3930`)
                }
            } else {
                message.reply(`il faut rejoindre un channel`);
                return;
            }
        }

        player = client.music.players.get(message.guild.id);
        
        if (!channel || channel.id != player.voiceChannel.id) {
            message.reply(`tu dois être dans le même channel vocal du client pour utiliser cette commande`);
            return;
        }

        var argsWithoutURL = new Array();
        var argsWithURL = new Array();

        args.forEach(element => {
            if (validURL(element)) {
                argsWithURL.push(element);
            } else {
                argsWithoutURL.push(element);
            }
        });

        //On donne des urls
        if (argsWithURL.length > 0) {
            argsWithURL.forEach(async element => {
                const searchResults = await client.music.search(element, message.author);
                const track = searchResults.tracks[0];

                player.queue.add(track);
                message.channel.send(Builder.createMessageToAddInQueue(player, track));

                if (!player.playing)
                    player.play();
            });
        } else {
            const searchResults = await client.music.search(argsWithoutURL.join(' '), message.author);
            const track = searchResults.tracks[0];

            player.queue.add(track);

            message.channel.send(Builder.createMessageToAddInQueue(player, track));

            if (!player.playing)
                player.play();
        }
    }
}

/**
 * Fonction pour vérifier si une chaine est une URL ou non
 * @param {String} str Chaine à valider
 * @returns {Boolean} Vrai si c'est bien une URL, faux sinon
 */
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}