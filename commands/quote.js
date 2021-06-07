const prereqs = require('../prereqs.json');
const https = require('https');
const fs = require('fs');
const { MessageAttachment } = require('discord.js');
const quotes = prereqs.quotes;

function randomQuote() { return quotes[Math.floor(Math.random() * quotes.length)]; }

module.exports =
{
    name: 'quote',
    description: 'Send a quote to a server.',
    ownerOnly: false,
    cooldown: 3,
    execute(bot, msg, args)
    {
        var s_channel = msg.channel.name;
        var s_guild = msg.guild.name;
        var msgString = randomQuote();
        var link = msgString.startsWith('https://');

        if (!link)
        {
            msg.channel.send(msgString);
            console.log(`Quote sent to ${s_channel} in ${s_guild}`);
            return;
        }
        console.log('Quote command picked link. Figuring out what to do...');

        var fileExts = ['.png', '.jpg', '.gif', '.mp4', '.mov'];
        var fileType = msgString.slice(msgString.length - 4, msgString.length);
        var doDownload = fileExts.indexOf(fileType) !== -1 || msgString.includes('pbs.twimg.com') || msgString.includes('media.discordapp.net');
        
        if (!doDownload)
        {
            console.log('Link determined to not be media. Continuing...')
            msg.channel.send(msgString);
            console.log(`Quote sent to ${s_channel} in ${s_guild}`);
            return;
        }
        console.log('Link determined to be media. Getting file...');
        
        var atch = new MessageAttachment(msgString);
        msg.channel.send(atch);
        console.log(`Quote sent to ${s_channel} in ${s_guild}`);

        if (doDownload)
        {
            //fs.unlink(filePath);
            //console.log(`File ${filePath} deleted`);
        }
    },
};