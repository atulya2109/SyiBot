const Discord = require('discord.js');
module.exports = {
    name: 'queue',
    description: 'Shows the music queue',
    args: false,
    usage: '<prefix>queue',
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

        const queue = player.getQueue(message.guild.id);

        if (queue) {
            /**
             * @type {Track[]}
             */
            const tracksInQueue = queue.tracks.map((song) => {
                return `[${song.name}](${song.url})`;
            });

            tracksInQueue.unshift(`[${queue.playing.name}](${queue.playing.url})`);
            // console.log(tracksInQueue);
            return message.channel.send({
                embed: {
                    color: client.colors.success, description: `${tracksInQueue.reduce((list, song, idx) => {
                        if (idx === 0)
                            return list.concat(`${idx + 1}. ${song} (currently playing)\n`);
                        else
                            return list.concat(`${idx + 1}. ${song}\n`);
                    }, '')}`
                }
            });
        }
        else {
            return message.channel.send({ embed: { color: client.colors.error, description: `${client.emotes.error} There is nothing playing!` } });
        }


    },
};