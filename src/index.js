const fs = require('fs')
const Discord = require('discord.js');
const client = new Discord.Client();
const {Player} = require('discord-player');

const {prefix} = require('./config.json');
const token = process.env.SYIBOT_API_KEY;

const player = new Player(client);
client.player = player;

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){

    const command = require(`./commands/${file}`);
    client.commands.set(command.name,command);
    console.info(`Command Set: ${command.name}`);
}

client.on('ready',() => {
    console.info(`Logged in as ${client.user.tag}!`);
})

client.on('message', msg => {
    
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);
    
    try{
        command.execute(msg,args);
    }
    catch(error){
        
        console.error(`Failed To Execute ${commandName}`);
        console.error(error);
        msg.channel.send('There was an error while executing that command');
    }

});

client.login(token);