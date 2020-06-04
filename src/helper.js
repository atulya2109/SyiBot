const spotifyWebApi = require('spotify-web-api-node');
const ytdl = require('ytdl-core');



var spotify = new spotifyWebApi({
    clientId: '9dabf7c6d86b40edbde34351107b09dd',
    clientSecret: '7d3837a03ff943a6a2aa6b4d9f957b91',
  });
  
  spotify.clientCredentialsGrant().then((data) => {
      spotify.setAccessToken(data.body['access_token']);
  });

module.exports = {


    async playFromYoutube(voiceChannel,songName,guildid,client){

        //BUG: discord-player.play gets executed for the first two songs. Why?

        let song;
    
        try{
            if(client.player.isPlaying(guildid))
            {   
                console.log(`Enqueued ${songName}`);
                song = await client.player.addToQueue(guildid, songName);
            }
            else{
                console.log(`Played ${songName}`);
                song = await client.player.play(voiceChannel,songName);
                
            }
        }
        catch(error){
            console.log(`${error}: ${song.name}`);
        }
        

        return song;
    },

    getPlaylistFromId(link){
        
        // https://open.spotify.com/playlist/0memTcNWnV7VmVBQetktTp?si=tFqZUyzhQFqGWcax400RQw   
        // TODO: Implement functionality to parse the above url
        
        var id;

        if(link.indexOf("spotify:") != -1)
        {   
            // end = link.lastIndexOf('?');
            id = link.substring(link.lastIndexOf(':')+1);
            
        }
        else if(link.indexOf("playlist/") != -1){

            if(link.indexOf('?') == -1)
                id = link.substring(link.lastIndexOf('/'));
            else
                id = link.substring(link.lastIndexOf('/')+1,link.indexOf('?'));
        }
        else{
            
            id = null;

        }

        // console.log(id);
        return spotify.getPlaylist(id);
    }
}