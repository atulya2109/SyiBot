const Player = require('discord-player/src/Player');
const Discord = require('discord.js');
module.exports = {
    name: 'pause',
    description: 'Pauses currently music',
    args: false,
    usage: '<prefix>pause',
    guildOnly: true,
    /**
     * 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */

    execute(message, args) {

        if (args.length == 0) {

            const client = message.client;
            /**
             * @type {Player} 
             */
            const player = client.player;

            if (!message.member.voice.channel)
                return message.channel.send({ embed: { color: client.colors.error, description: `${client.emotes.error} You must be in a voice channel!` } });

            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
                return message.channel.send({ embed: { color: client.colors.error, description: `${client.emotes.error} You are not in my voice channel!` } });

            if (!player.isPlaying(message.guild.id) || (player.getQueue(message.guild.id) && player.getQueue(message.guild.id).paused))
                return message.channel.send({ embed: { color: client.colors.error, description: `${client.emotes.error} There is nothing playing!` } });

            const songsEmbed = new Discord.MessageEmbed()
                .setColor('#39ff14');

            const guildId = message.guild.id;
            player.pause(guildId).then((song) => {
                return message.channel.send({ embed: { color: client.colors.success, description: `${client.emotes.success} Song Paused: [${song.name}](${song.url})` } })
            });

        }
    },
};