const {getPlaylistFromId,playFromYoutube} = require('../helper.js');
const Discord = require('discord.js');

// const exampleEmbed = new Discord.MessageEmbed()
// 	.setColor('#0099ff')
// 	.setTitle('Some title')
// 	.setDescription('Some description here')


const generateSongList = (tracksInfo) => {
    
    var songsInfo = tracksInfo.map((trackInfo) => {
        return trackInfo.track.name.concat(` by ${trackInfo.track.artists[0].name}`);
    });

    return songsInfo;
}

module.exports = {
    
    name: 'spotify',
    description: 'Plays Songs From A Spotify Playlist',
    args: true,
    usage: ['<playlist>'],
    guildOnly: true,
    execute(message, args){
        
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel){
            return message.reply('First join a voice channel!');
        }

        if(args.length == 1){
    
            data = getPlaylistFromId(args[0]).then(({body,statusCode}) => {

            playlist = {
                name: body.name,
                author: body.owner.display_name,
                tracks: body.tracks['items']
            }

            if(statusCode == 200){

                // TODO: Add songs to queue after implementing play command
                
                
                const client = message.client;
                const guildid = message.guild.id;

                let songsList = generateSongList(playlist.tracks);
                let songs = songsList.reduce((songs,song,idx) => {

                    return songs.concat(`${idx+1}. ${song}\n`);

                },'').trim();

                const queuedSongsEmbed = new Discord.MessageEmbed()
                	.setColor('#39ff14')
                	.setDescription(`Added the following songs:\n${songs}\n[${message.author}]`);

                songsList.forEach((song,idx) => setTimeout(async ()=>{

                    try{
                        await playFromYoutube(voiceChannel,song,guildid,client);
                    }
                    catch(error){
                        console.error(error);
                    }

                },idx * 1000));

                message.channel.send(queuedSongsEmbed);

                // client.player.getQueue(guildid).on('songChanged',(os,ns) => {
                //     message.channel.send(queuedSongsEmbed.setDescription(`Now playing [${ns.name}](${ns.url})`));
                // });
            }
            else
                message.channel.send('Some Error Occurred');        
            });
        }
        
    }

}