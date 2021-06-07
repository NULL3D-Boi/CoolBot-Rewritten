const prereqs = require('../prereqs.json');

module.exports =
{
    name: 'requestquote',
    description: 'Request a quote to be added to CoolBot.',
    ownerOnly: false,
    cooldown: 5,
    execute(bot, msg, args)
    {
        if (!prereqs.allowRequests) msg.reply("I'm not accepting quote requests right now! Try again later!");

        var string = msg.content.slice(14);

        if (string === '' && !msg.attachments.size)
        {
            msg.reply("you need to provide text, a link, or an image/video.");
            return;
        }
        else
        {
            if (string === "")
            {
                if (msg.attachments.size) string = msg.attachments.first().url;
            } else if (string.includes("ඞ")) return msg.reply("you're not funny.");
            else
            {
                if (msg.attachments.size)
                {
                    msg.reply("you can not send text and an attachment as one quote.");
                    return;
                }
            }
        }

        var channel = bot.channels.cache.get(prereqs.guilds.requests_channel);
        var cool_person = msg.author;
        channel.send(`Requested by <@${cool_person.id}>: ${string}`);
        console.log(`Quote ${string} was requested by ${cool_person.tag}`);
        msg.reply("quote requested successfully.");
    },
};