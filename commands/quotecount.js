const prereqs = require('../prereqs.json');
const quotes = prereqs.quotes;

module.exports =
{
    name: 'quotecount',
    description: 'Get a count of how many quotes CoolBot can use.',
    ownerOnly: false,
    cooldown: 1,
    execute(bot, msg, args)
    {
        msg.reply(`there are ${quotes.length.toString()} quotes in my memory.`);
    },
};