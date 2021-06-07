const prereqs = require('../prereqs.json');
const fs = require('fs');
const quotes = prereqs.quotes;

module.exports =
{
    name: 'addquote',
    description: "Adds a quote to CoolBot's memory.",
    ownerOnly: true,
    execute(bot, msg, args)
    {
        if (msg.author.id !== prereqs.owner_id) return msg.channel.send("https://tenor.com/view/troll-face-rage-comics-trolled-meme-gif-19882304");
        
        var string = msg.content.slice(10);

        if (string === "" && !msg.attachments.size) msg.reply("you need to provide text, a link, or an image/video."); else
        {
            if (msg.attachments.size) string = msg.attachments.first().url;
            quotes.push(string);

            fs.writeFileSync("/home/coolbot/Desktop/CoolBot/prereqs.json", JSON.stringify(prereqs, null, 2), (err) => {
                if (err) console.error(err);
            });

            console.log(`Quote '${string}' was added to array at position ${quotes.length.toString()}`);
            msg.reply("quote added successfully.");
        };
        
    },
};