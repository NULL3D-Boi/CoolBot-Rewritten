const prereqs = require('../prereqs.json');
const hastebin = require('hastebin-gen');
const fs = require('fs');
const path = require('path');
const quotes = fs.readdirSync('/root/coolbot/quotes');

module.exports =
{
    name: 'searchquote',
    description: 'Search for a quote using keywords.',
    ownerOnly: false,
    execute(bot, msg, args)
    {
        var searchTerm = msg.content.slice(13).toLowerCase();

        console.log(`Search started by ${msg.author.tag} with term '${searchTerm}'`);

        if (searchTerm === '') return msg.reply('you have to provide a search term!');

        var validQuotes = [];
        var validNames = [];

        for (var i = 0; i < quotes.length; i++)
        {
            var file = path.resolve(`quotes/${quotes[i]}`);
            var fileType = path.extname(file);
            var fileName = path.basename(file);
            if (fileType === '.txt')
            {
                var string = fs.readFileSync(file, 'utf8');
                var n = string.toLowerCase().search(searchTerm);
                if (n > -1)
                {
                    validQuotes.push(string);
                    validNames.push(parseInt(path.basename(file)));
                    console.log(`Quote ${fileName} valid. Adding to results.`);
                }
            }
        }

        if (validQuotes.length === 0) return msg.reply('no quotes found!');
        
        var response = [];
        for (var j = 0; j < validQuotes.length; j++)
        {
            if (validQuotes.length > 10) response.push(`Quote found! Quote #${validNames[j] + 1}: ${validQuotes[j]}\n`);
            else response.push(`Quote found! Quote #${validNames[j] + 1}: ${validQuotes[j]}`);
        }
        

        if (validQuotes.length > 10)
        {
            hastebin(response, { extension: 'txt' }).then(haste => {
                console.log(`Hastebin link created: ${haste}`);
                msg.channel.send(`More than ten quotes were found. You can see them all here: ${haste}`);
            })
        }
        else msg.channel.send(response, { split: true });
        
        console.log(`Search '${searchTerm}' completed. ${validQuotes.length} valid quotes found.`);
    }
}