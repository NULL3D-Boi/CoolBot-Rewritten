const prereqs = require('../prereqs.json');
const hastebin = require('hastebin-gen');
const quotes = prereqs.quotes;

module.exports =
{
    name: 'searchquote',
    description: 'Search for a quote using keywords.',
    ownerOnly: false,
    cooldown: 5,
    execute(bot, msg, args)
    {
        var searchTerm = msg.content.slice(13).toLowerCase();

        if (searchTerm === '') return msg.reply('you have to provide a search term!');

        var validQuotes = [];

        for (var i = 0; i < quotes.length; i++)
        {
            var n = quotes[i].toLowerCase().search(searchTerm);
            if (n > -1) validQuotes.push(i);
        }

        if (validQuotes.length === 0) return msg.reply('no quotes found!');
        
        var response = [];
        for (var j = 0; j < validQuotes.length; j++)
        {
            if (validQuotes.length > 10) response.push(`Quote found! Quote #${(validQuotes[j] + 1).toString()}: ${quotes[validQuotes[j]]}\n`);
            else response.push(`Quote found! Quote #${(validQuotes[j] + 1).toString()}: ${quotes[validQuotes[j]]}`);
        }
        

        if (validQuotes.length > 10)
        {
            var txtLink = hastebin(response, { extension: 'txt' }).then(haste => {
                console.log(`Hastebin link created: ${haste}`);
                msg.channel.send(`More than ten quotes were found. You can see them all here: ${haste}`);
            })
        }
        else msg.channel.send(response, { split: true });
    }
}