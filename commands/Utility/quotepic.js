const path = require('path');
const fs = require('fs');
const prereqs = JSON.parse(fs.readFileSync('/CoolBot-Rewritten/prereqs.json', 'utf8'));
const { MessageAttachment } = require('discord.js');
const quotes = fs.readdirSync('/CoolBot-Rewritten/quotes/pictures/');

function randomQuote() { return quotes[Math.floor(Math.random() * quotes.length)]; }

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quotepic')
		.setDescription('Send a picture quote to a server.'),
	async execute(interaction) {
        //var sChannel, sGuild, msg, fileType;
        //sChannel = msg.channel.name;
        //sGuild = msg.guild.name;
        file = path.resolve(`quotes/pictures/${randomQuote()}`);
        fileType = path.extname(file);

        console.log(`Quote picked: ${file}`);

        if (fileType === '.txt')
        {
            await interaction.reply(fs.readFileSync(file, 'utf8'));
            //console.log(`Quote sent to ${sChannel} in ${sGuild}`);
            //bot.channels.fetch(prereqs.guilds.log_channel).then(channel => channel.send(`📝 Quote sent to ${sChannel} in ${sGuild}`));
            return;
        }
        
        interaction.reply({files: [file]});
        console.log(file);
        //bot.channels.fetch(prereqs.guilds.log_channel).then(channel => channel.send(`📝 Quote sent to ${sChannel} in ${sGuild}`));
	},
};


    

