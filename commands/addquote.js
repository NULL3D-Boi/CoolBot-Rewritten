const http = require('https');
const fs = require('fs');
const path = require('path');
const prereqs = JSON.parse(fs.readFileSync('/root/coolbot/prereqs.json', 'utf8'));
const quotes = fs.readdirSync('/root/coolbot/quotes');
const fileExts = ['.png', '.jpg', '.gif', '.mp4', '.mov', '.webm'];
const sizeCap = 8388608;

module.exports =
{
    name: 'addquote',
    description: "Adds a quote to CoolBot's memory.",
    ownerOnly: true,
    execute(bot, msg, args)
    {
        var download = function(url, fileName, cb) {
            var file = fs.createWriteStream(`/root/coolbot/quotes/${fileName}`);
            http.get(url, function(response) {
                response.pipe(file);
                file.on('finish', function() {
                    file.close(cb);
                    console.log(`Media file was added to folder as ${fileName}`);
                });
            }).on('error', function(err) {
                fs.unlink(dest);
                if (cb) cb(err.message);
            });
        };

        if (msg.author.id !== prereqs.owner_id) return msg.channel.send("https://tenor.com/view/troll-face-rage-comics-trolled-meme-gif-19882304");
        
        var fileType, quoteCount, string, fileName;
        quoteCount = quotes.length.toString();
        string = msg.content.slice(10);

        if (string === "")
        {
            if (!msg.attachments.size) return msg.reply("you need to provide text, a link, or an image/video.");
            fileType = msg.attachments.first().name.slice(-3);
            if (fileType === 'ebm') fileType = 'webm';

            if (msg.attachments.first().size > sizeCap) return msg.reply('you can not upload media bigger than 8MB!');
            var fileURL = msg.attachments.first().url;
            download(fileURL, `${quoteCount.toString()}.${fileType}`);
        }
        else
        {
            if (msg.attachments.size > 0) return msg.reply("you can't have text and an attachment in one quote.");
            if (string.startsWith('https:'))
            {
                if (fileExts.indexOf(path.extname(string)) !== -1) return msg.reply('you must upload the file directly as an attachment!');
            }
            fileType = 'txt';
            fileName = `${quoteCount.toString()}.${fileType}`;

            var file = fs.createWriteStream(`/root/coolbot/quotes/${fileName}`);
            file.write(string);
            file.close();
            console.log(`Quote '${string}' was added to folder as ${fileName}`);
        }
        msg.reply("quote added successfully."); 
    },
};