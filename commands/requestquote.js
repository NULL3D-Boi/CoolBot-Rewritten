const prereqs = require('../prereqs.json');
const path = require('path');
const sizeCap = 8388608;
const fileExts = ['.png', '.jpg', '.gif', '.mp4', '.mov', '.webm'];

module.exports =
{
    name: 'requestquote',
    description: 'Request a quote to be added to CoolBot.',
    ownerOnly: false,
    cooldown: 5,
    execute(bot, msg, args)
    {
        if (!prereqs.allowRequests) return msg.reply("I'm not accepting quote requests right now! Try again later!");

        var string = msg.content.slice(14);

        if (string === '' && !msg.attachments.size)
        {
            return msg.reply("you need to provide text, a link, or an image/video.");
        }
        else
        {
            if (string === '')
            {
                if (msg.attachments.size) string = msg.attachments.first().url;
                if (msg.attachments.first().size > sizeCap) return msg.reply('you can not upload media bigger than 8MB!');
                
            } else if (string.includes("ඞ")) return msg.reply("you're not funny.");
            else
            {
                if (msg.attachments.size) return msg.reply("you can not send text and an attachment as one quote.");
                if (string.startsWith('https:') && fileExts.indexOf(path.extname(string)) !== -1) return msg.reply('you must upload the file directly as an attachment!');
            }
        }

        var channel = bot.channels.cache.get(prereqs.guilds.requests_channel);
        var logChannel = bot.channels.cache.get(prereqs.log_channel);
        var cool_person = msg.author;
        channel.send(`Requested by <@${cool_person.id}>: ${string}`);
        console.log(`Quote ${string} was requested by ${cool_person.tag}`);
        //logChannel.send(`📢 Quote ${string} was requested by ${cool_person.tag}`);
        msg.reply("quote requested successfully.");
    },
};