module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    args: true,
    usage: '<command>',
    guildOnly: true,
    execute(message,args){
        
        console.info('Executing Reload');
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName);

        if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);

        delete require.cache[require.resolve(`./${command.name}.js`)];
        console.info('Deleted Command');

        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.reply('Command reloaded');

        } catch (error) {
            console.log(error);
            message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        }        
    },
};