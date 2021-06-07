const prereqs = require('../prereqs.json');
const fs = require('fs');
const quotes = prereqs.quotes;

module.exports =
{
    name: 'removequote',
    description: "Removes a quote from CoolBot's memory.",
    ownerOnly: true,
    execute(bot, msg, args)
    {
        if (msg.author.id !== prereqs.owner_id) return msg.channel.send("https://tenor.com/view/troll-face-rage-comics-trolled-meme-gif-19882304");
        
        var searchTerm = msg.content.slice(13);
        var n = Number(searchTerm);

        if (n === Number.NaN || n > quotes.length || n < 0) return msg.reply('invalid quote!');
        
        quotes.splice(n, 1);

        fs.writeFileSync("/home/coolbot/Desktop/CoolBot/prereqs.json", JSON.stringify(prereqs, null, 2), (err) => {
            if (err) console.error(err);
        });

        console.log(`Quote ${n} removed from array`);
        msg.reply('quote removed successfully.');
    }
}