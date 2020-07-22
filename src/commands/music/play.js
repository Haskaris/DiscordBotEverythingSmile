const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class PlayCommand extends BaseCommand {
    constructor() {
        super('play', 'music', []);
    }

    async run(client, message, args) {
        const query = args.join(' ');

        const { channel } = message.member.voice;

        if (channel) {
            let i = 0;
            const searchResults = await client.music.search(query, message.author);
            const tracks = searchResults.tracks.slice(0, 10);
            const tracksInfo = tracks.map(r => `${++i}) ${r.title}`).join('\n');
            const embed = new MessageEmbed()
                .setTitle('Music Result')
                .setDescription(tracksInfo);
            
            message.channel.send(embed);
            
            const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= tracks.length);

            try {
                const response = await message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] });

                if (response) {
                    const entry = response.first().content;
                    const player = client.music.players.get(message.guild.id);

                    const track = tracks[entry-1];
                    player.queue.add(track);
                    message.channel.send(`Enqueuing track ${track.title}`);
                    if (!player.playing)
                        player.play();
                }
            } catch (err) {
                console.log("ERREUR");
                console.log(err);
                console.log("ERREUR");
            }
        }
    }
}