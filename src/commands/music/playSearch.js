const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class PlaySearchCommand extends BaseCommand {
    constructor() {
        super('playsearch', 'music', ['ps']);
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

        //Je ne vois pas pourquoi on voudrait chercher des url
        //On donne des urls
        if (argsWithURL.length > 0) {
            argsWithURL.forEach(async element => {
                const searchResults = await client.music.search(element, message.author);
                const track = searchResults.tracks[0];
                message.channel.send(`Mise en file ${track.title}`);
                player.queue.add(track);
                if (!player.playing)
                    player.play();
            });
        } else {
            let i = 0;
            const searchResults = await client.music.search(argsWithoutURL.join(' '), message.author);
            const tracks = searchResults.tracks.slice(0, 10);
            const tracksInfo = tracks.map(r => `${++i}) ${r.title}`).join('\n');
            const embed = new MessageEmbed()
                .setTitle('Résultats')
                .setColor(0x0099ff);

            var file = "";
            for (let i = 1; i < player.queue.length; i++) {
                file = `${i}. [${player.queue[i].title}](${player.queue[i].uri})\n`
            }

            //embed.addFields({name: 'Musique à venir', value: file});
            embed.setDescription(file);
            
            message.channel.send(embed);
            
            const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= tracks.length);

            try {
                const response = await message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] });

                if (response) {
                    const entry = response.first().content;

                    const track = tracks[entry-1];
                    player.queue.add(track);
                    message.channel.send(Builder.createMessageToAddInQueue(player, track));
                    if (!player.playing)
                        player.play();
                }
            } catch (err) {
                console.log(err);
            }
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