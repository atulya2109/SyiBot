const Player = require('discord-player/src/Player');
const Discord = require('discord.js');

module.exports = {
    name: 'play',
    description: 'Plays music from youtube',
    args: true,
    usage: '<link>',
    guildOnly: true,

    /**
     * @param {Discord.Message} message 
     * @param {string[]} args 
     */
    execute(message, args) {


        if (args.length > 0) {

            const song = args.join(' ');

            const voiceChannel = message.member.voice.channel;

            const client = message.client;
            const guildid = message.guild.id;

            /**
             * @type {Player}
             */
            const player = client.player;

            const songsEmbed = new Discord.MessageEmbed()
                .setColor('#39ff14')

            if (!voiceChannel) {
                return message.reply('First join a voice channel!');
            }

            let isQueueEmpty = !player.isPlaying(guildid);

            if (!isQueueEmpty) {
                player.addToQueue(guildid, song).then((song) => { message.channel.send(songsEmbed.setDescription(`Now playing [${song.name}](${song.url})`)); })

            }
            else {
                player.play(voiceChannel, song).then((song) => { message.channel.send(songsEmbed.setDescription(`Enqueued [${song.name}](${song.url})`)); });

            }

        }

    },
};