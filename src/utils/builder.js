const { MessageEmbed } = require('discord.js');

class Builder {

    constructor() {}

    createMessageToAddInQueue(player, track) {
        const msBeforePlay = this.getMusicDuration(player) - track.duration;
        let estimatedTimeBeforePlaying = {};
        

        let embed = new MessageEmbed()
        .setColor(0x0099ff)
        .setAuthor(`${track.author}`)
        .setDescription(`[${track.title}](${track.uri})`)
        .addField(`Durée`,`${millisToMinutesAndSeconds(track.duration)}`, true); 

        if (msBeforePlay > 0) {
            embed.addField(`Temps estimé avant d'être jouée`, `${millisToMinutesAndSeconds(msBeforePlay)}`, true);
        }
        
        embed.addField(`Position`, `${player.queue.length}`, true);
        return embed;
    }

    /**
     * Retourne le temps de musique du bot en ms
     * @param {*} player 
     */
    getMusicDuration(player) {
        let ms = 0;
        player.queue.forEach(t => {
            ms = ms + t.duration;
        });
        return ms;
    }
    
}

/**
 * https://stackoverflow.com/a/21294619
 * @param {int} millis 
 */
function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
module.exports = new Builder();