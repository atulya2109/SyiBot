const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix,token} = require('./config.json')


client.on('ready',() => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', msg => {
    
    if(msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    
});

client.login(token)