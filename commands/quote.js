const path = require('path');
const fs = require('fs');
const prereqs = JSON.parse(fs.readFileSync('/root/coolbot/prereqs.json', 'utf8'));
const { MessageAttachment } = require('discord.js');
const { brotliCompressSync } = require('zlib');
const quotes = fs.readdirSync('/root/coolbot/quotes/');

function randomQuote() { return quotes[Math.floor(Math.random() * quotes.length)]; }

module.exports =
{
    name: 'quote',
    description: 'Send a quote to a server.',
    ownerOnly: false,
    cooldown: 3,
    execute(bot, msg, args)
    {
        var sChannel, sGuild, msg, fileType;
        sChannel = msg.channel.name;
        sGuild = msg.guild.name;
        file = path.resolve(`quotes/${randomQuote()}`);
        fileType = path.extname(file);

        console.log(`Quote picked: ${file}`);

        if (fileType === '.txt')
        {
            msg.channel.send(fs.readFileSync(file, 'utf8'));
            console.log(`Quote sent to ${sChannel} in ${sGuild}`);
            return;
        }

        var atch = new MessageAttachment(file);
        msg.channel.send(atch);
        console.log(`Quote sent to ${sChannel} in ${sGuild}`);
        bot.channels.fetch(prereqs.guilds.log_channel).then(channel => channel.send(`📝 Quote sent to ${sChannel} in ${sGuild}`));
    },
};