const Discord = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Plays music from youtube',
    args: true,
    usage: '<link>',
    guildOnly: true,

    /**
     * 
     * @param {*} message 
     * @param {string[]} args 
     */
    execute(message, args) {


        if (args.length > 0) {

            const song = args.join(' ');

            const voiceChannel = message.member.voice.channel;
            const client = message.client;
            const guildid = message.guild.id;

            const songsEmbed = new Discord.MessageEmbed()
                .setColor('#39ff14')

            if (!voiceChannel) {
                return message.reply('First join a voice channel!');
            }

            let isQueueEmpty = !client.player.isPlaying(guildid);

            if (!isQueueEmpty) {
                client.player.addToQueue(guildid, song).then((song) => { message.channel.send(songsEmbed.setDescription(`Now playing [${song.name}](${song.url})`)); })

            }
            else {
                client.player.play(voiceChannel, song).then((song) => { message.channel.send(songsEmbed.setDescription(`Enqueued [${song.name}](${song.url})`)); });

            }

        }

    },
};