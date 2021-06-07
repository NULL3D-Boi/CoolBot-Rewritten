const prereqs = require('../prereqs.json');
const fs = require('fs');

module.exports =
{
    name: 'togglerequests',
    description: 'Enable and disable the ability for users to request quotes.',
    ownerOnly: true,
    execute(bot, msg, args)
    {
        if (msg.author.id !== prereqs.owner_id) return msg.channel.send("https://tenor.com/view/troll-face-rage-comics-trolled-meme-gif-19882304");

        switch (prereqs.allowRequests)
        {
            case true:
            {
                prereqs.allowRequests = false;
                bot.user.setPresence({ activity: { name: '[REQUESTING DISABLED] +quoterules/+help' }, status: 'dnd' });
                console.log('Quote requesting was \x1b[31mdisabled\x1b[0m');
                msg.reply('quote requesting is now DISABLED.');
            } break;
            case false:
            {
                prereqs.allowRequests = true;
                bot.user.setPresence({ activity: { name: '+quoterules/+help' }, status: 'online' });
                console.log('Quote requesting was \x1b[32menabled\x1b[0m');
                msg.reply('quote requesting is now ENABLED.');
            } break;
        }

        fs.writeFileSync("/home/coolbot/Desktop/CoolBot/prereqs.json", JSON.stringify(prereqs, null, 2), (err) => {
            if (err) console.error(err);
        });
    },
};