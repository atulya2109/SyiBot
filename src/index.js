const fs = require('fs')
const Discord = require('discord.js');
const client = new Discord.Client();
const { Player } = require('discord-player');

const { prefix, colors, emotes } = require('./config.json');
const token = process.env.SYIBOT_API_KEY;

const player = new Player(client, { leaveOnEnd: true, leaveOnStop: true, leaveOnEmpty: true });
client.player = player;
client.colors = colors;
client.emotes = emotes;

client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./src/commands');

console.log(commandFiles);

for (const folder of commandFolders) {
    var commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {

        const command = require(`./commands/${folder}/${file}`);
        command.folder = folder;
        client.commands.set(command.name, command);
        console.info(`${folder} Command Set: ${command.name}`);
    }
}

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);
})

client.on('message', msg => {

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(msg, args);
    }
    catch (error) {

        console.error(`Failed To Execute ${commandName}`);
        console.error(error);
        msg.channel.send('There was an error while executing that command');
    }

});

client.login(token);