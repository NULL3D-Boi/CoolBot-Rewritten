const Discord = require("discord.js");
const fs = require("fs");
const cron = require("cron");
const path = require('path');
const bot = new Discord.Client({ intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildIntegrations,
    Discord.GatewayIntentBits.MessageContent
  ]})
const prereqs = JSON.parse(fs.readFileSync('/CoolBot-Rewritten/prereqs.json', 'utf8'));
const quotes = fs.readdirSync('/CoolBot-Rewritten/quotes');
bot.commands = new Discord.Collection();
bot.cooldowns = new Discord.Collection();
//require('discord-buttons')(bot);

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			bot.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

function switchTopic()
{
    function randomQuote() { return quotes[Math.floor(Math.random() * quotes.length)]; }

    var file, fileType;
    file = path.resolve(`quotes/${randomQuote()}`);
    fileType = path.extname(file);

    if (fileType !== '.txt')
    {
        switchTopic();
        return;
    }

    var string = fs.readFileSync(file, 'utf8')
    channel.setTopic(string);
    bot.channels.fetch(prereqs.guilds.main_channel).then(channel1 => {
        console.log(`Changed the topic in ${channel1.name} to ${string}`);
        bot.channels.fetch(prereqs.guilds.main_channel).then(channel2 => channel2.send(`Changed the topic in ${channel1.name} to ${string}`));
    });
};

function checkRequests()
{
    switch (prereqs.allowRequests)
    {
        case true:
        {
            console.log('Quote requesting is currently \x1b[32menabled\x1b[0m');
            bot.user.setPresence({ activity: { name: '+help' }, status: 0 });
        } break;
        case false:
        {
            console.log('Quote requesting is currently \x1b[31mdisabled\x1b[0m');
            bot.user.setPresence({ activity: { name: '[REQUESTING DISABLED] +help' }, status: 2 });
        } break;
    }
};

bot.on("guildCreate", guild => {
    console.log("\x1b[32m",`* Joined guild: ${guild.name}`,"\x1b[0m");
    bot.channels.fetch(prereqs.guilds.log_channel).then(channel => channel.send(`🚪🚶‍♂️ Joined guild: ${guild.name}`));
});
bot.on("guildDelete", guild => {
    console.log("\x1b[31m",`* Left guild: ${guild.name}`,"\x1b[0m");
    bot.channels.fetch(prereqs.guilds.log_channel).then(channel => channel.send(`🚶‍♂️🚪 Left guild: ${guild.name}`));
});

bot.on('ready', async() => {
    let topicChange = new cron.CronJob("0 0 0 * * *", () => { switchTopic(); });
    topicChange.start();

    console.log('Loading commands...');
    for (var i = 0; i < bot.commands.size; i++) console.log(`Command loaded: ${bot.commands.map(command => command.name)[i]}`);
    console.log('Finding servers...');
    for (var i = 0; i < bot.guilds.cache.size; i++) console.log(`Server #${i + 1}: ${bot.guilds.cache.map(channel => channel.name)[i]}`);

    bot.channels.fetch(prereqs.guilds.log_channel).then(channel => console.log(`Client set to log actions in #${channel.name}`));
    bot.channels.fetch(prereqs.guilds.main_channel).then(channel => console.log(`Client set to change topic in #${channel.name}`));
    bot.channels.fetch(prereqs.guilds.requests_channel).then(channel => console.log(`Client set to send requests to #${channel.name}`));

    console.log(`Client loaded ${quotes.length} quotes`);
    checkRequests();
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.channels.fetch(prereqs.guilds.log_channel).then(channel => channel.send('✔️ Bot online'));

    //Slash commands
    
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

bot.on('message', msg => {
    if (!msg.content.startsWith(prereqs.prefix) || msg.author.bot || msg.channel.type === 'dm') return;

    const args = msg.content.slice(prereqs.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if (!bot.commands.has(command)) return;

	try {
		bot.commands.get(command).execute(bot, msg, args);
	} catch (error) {
		console.error(error);
        bot.channels.fetch(prereqs.guilds.log_channel).then(channel => channel.send(`⛔ Error found in command *${command}*!!\n\n**${error}**`));
		msg.reply('there was an error trying to execute that command!');
	}
});

bot.on('clickButton', async (button) => {
    if (button.id === 'bRules')
    {
        button.message.delete();
        button.message.channel.send(fs.readFileSync('/CoolBot-Rewritten/quoterules.txt', 'utf8'));
    }
    if (button.id === 'bTut')
    {
        button.setDisabled();
        msg.channel.send(fs.readFileSync('/CoolBot-Rewritten/quotehelp.txt', 'utf8'));
    }
})

bot.login(prereqs.token);

bot.on(Discord.Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});