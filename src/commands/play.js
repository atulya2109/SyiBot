const Discord = require('discord.js');
const {playFromYoutube} = require('../helper.js');

module.exports = {
    name: 'play',
    description: 'Plays music from youtube',
    args: true,
    usage: '<link>',  
    guildOnly: true,
    execute(message,args){

        const voiceChannel = message.member.voice.channel;
        const client = message.client;
        const guildid = message.guild.id;

        const songsEmbed = new Discord.MessageEmbed()
                	.setColor('#39ff14')       	

        if(!voiceChannel){
            return message.reply('First join a voice channel!');
        }

        let isQueueEmpty = !client.player.isPlaying(guildid);
        
        playFromYoutube(voiceChannel,args[0],guildid,client).then((song) => {

            if(isQueueEmpty)
                message.channel.send(songsEmbed.setDescription(`Now playing [${song.name}](${song.url})`));
            else    
                message.channel.send(songsEmbed.setDescription(`Enqueued [${song.name}](${song.url})`));
        }).catch(console.error);

    },
};