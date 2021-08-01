const fs = require('fs');
const path = require('path');
const quotes = fs.readdirSync('/root/coolbot/quotes');

module.exports =
{
    name: 'quotecount',
    description: 'Get a count of how many quotes CoolBot can use.',
    ownerOnly: false,
    execute(bot, msg, args)
    {
        var txtCount = 0;
        var imgCount = 0;
        var vidCount = 0;
        for (var i = 0;i < quotes.length;i++)
        {
            var ext = path.extname(quotes[i]);

            switch (ext)
            {
                case '.txt': txtCount++; break;
                case '.png': imgCount++; break;
                case '.jpg': imgCount++; break;
                case '.gif': imgCount++; break;
                case '.mp4': vidCount++; break;
                case '.mov': vidCount++; break;
                case '.webm': vidCount++; break;
            }
        }
        msg.reply(`there are ${quotes.length.toString()} quotes in my memory, split between ${txtCount} text files, ${imgCount} images, and ${vidCount} videos.`);
    },
};