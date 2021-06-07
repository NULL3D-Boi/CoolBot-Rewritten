const { Message } = require("discord.js");

module.exports =
{
    name: 'help',
    description: "List all of CoolBot's commands and their functions.",
    ownerOnly: false,
    execute(bot, msg, args)
    {
        const data = [];
        const { commands } = msg.client;

        if (!args.length)
        {
            data.push("__**CoolBot Commands**__");
            data.push(commands.map(command => command.name).join(' | '));
            data.push('**Use help followed by a command name for more info on a specific command.**');
            data.push('\nCoolBot created by https://twitter.com/defnotreal_');

            return msg.channel.send(data, { split: true });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name);

        if (!command) return msg.reply('invalid command!');

        data.push(`**Name:** ${command.name}`);
        data.push(`**Description:** ${command.description}`);
        //if (command.cooldown) data.push(`**Cooldown:** ${command.cooldown.toFixed(1)} second(s)`);
        if (command.ownerOnly) data.push('**OWNER ONLY**');

        msg.channel.send(data, { split: true });
    },
};