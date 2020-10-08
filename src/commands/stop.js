const Discord = require('discord.js');
module.exports = {
    name: 'stop',
    description: 'Stops the music and clears the queue',
    args: false,
    usage: '<prefix>stop',
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

        if (!player.getQueue(message.guild.id))
            return message.channel.send({ embed: { color: client.colors.error, description: `${client.emotes.error} There is nothing playing!` } });

        const songsEmbed = new Discord.MessageEmbed()
            .setColor('#39ff14');

        const guildId = message.guild.id;
        player.stop(guildId).then((_) => {
            return message.channel.send({ embed: { color: client.colors.success, description: `${client.emotes.success} Song Stopped` } })
        });
    },
};