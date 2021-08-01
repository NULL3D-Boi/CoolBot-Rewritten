const { MessageButton } = require('discord-buttons');

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
            const bRules = new MessageButton()
            .setStyle('red')
            .setLabel('Quote Rules')
            .setID('bRules');
            //const bTut = new MessageButton()
            //.setStyle('green')
            //.setLabel('Quote Instructions')
            //.setID('bTut');
            const bTwt = new MessageButton()
            .setStyle('url')
            .setURL('https://twitter.com/CoolBot_Twt')
            .setLabel('Twitter');
            const bGit = new MessageButton()
            .setStyle('url')
            .setURL('https://github.com/defnotreal/CoolBot')
            .setLabel('Source Code');
            const bInv = new MessageButton()
            .setStyle('url')
            .setURL('https://top.gg/bot/622968496321724426/invite/')
            .setLabel('Invite');
            const bDis = new MessageButton()
            .setStyle('url')
            .setURL('https://discord.gg/sGDtFaSpw7')
            .setLabel('Discord');

            data.push(`My name is CoolBot. I am currently in ${bot.guilds.cache.size} servers.`)
            data.push("__**Commands**__");
            data.push(commands.map(command => command.name).join(' | '));
            data.push('**Use help followed by a command name for more info on a specific command.**');
            data.push('\nCoolBot created by https://twitter.com/defnotreal_');

            return msg.channel.send(data, { 
                buttons: [bRules, bTwt, bGit, bInv, bDis]
             });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name);

        if (!command) return msg.reply('invalid command!');

        data.push(`**Name:** ${command.name}`);
        data.push(`**Description:** ${command.description}`);
        if (command.ownerOnly) data.push('**OWNER ONLY**');

        msg.channel.send(data);
    },
};
