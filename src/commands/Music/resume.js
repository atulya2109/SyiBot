const Discord = require('discord.js');
module.exports = {
    name: 'resume',
    description: 'Resumes the stream',
    args: false,
    usage: '<prefix>resume',
    guildOnly: true,
    execute(message, args) {

        const client = message.client;
        /**
         * @type {Player} 
         */
        const player = client.player;

        if (!message.member.voice.channel)
            return message.channel.send({ embed: { color: client.colors.error, description: `${client.emotes.error} You must be in a voice channel!` } });

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id)
            return message.channel.send({ embed: { color: client.colors.error, description: `${client.emotes.error} You are not in my voice channel!` } });

        if (player.getQueue(message.guild.id) && !player.getQueue(message.guild.id).paused)
            return message.channel.send({ embed: { color: client.colors.error, description: `${client.emotes.error} Currently playing!` } });

        const songsEmbed = new Discord.MessageEmbed()
            .setColor('#39ff14');

        const guildId = message.guild.id;
        player.resume(guildId).then((song) => {
            return message.channel.send({ embed: { color: client.colors.success, description: `${client.emotes.success} Song Resumed: [${song.name}](${song.url})` } })
        });

    },
};