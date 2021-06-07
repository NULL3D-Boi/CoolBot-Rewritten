const Discord = require("discord.js");
const fs = require("fs");
const cron = require("cron");
const bot = new Discord.Client();
const prereqs = require("./prereqs.json");
const quotes = prereqs.quotes;
bot.commands = new Discord.Collection();
bot.cooldowns = new Discord.Collection();

function randomQuote() { return quotes[Math.floor(Math.random() * quotes.length)]; }

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

function switchTopic() {
    var channel = bot.channels.cache.get(prereqs.guilds.main_channel);
    var string = randomQuote();
    channel.setTopic(string);
    console.log(`Changed the topic in ${channel.name} to ${string}`);
};

bot.on("guildCreate", guild => {
    console.log("\x1b[32m",`* Joined guild: ${guild.name}`,"\x1b[0m");
});
bot.on("guildDelete", guild => {
    console.log("\x1b[31m",`* Left guild: ${guild.name}`,"\x1b[0m");
});

bot.on('ready', async() => {
    let topicChange = new cron.CronJob("0 0 0 * * *", () => { switchTopic(); });
    topicChange.start();
    var m_channel = bot.channels.cache.get(prereqs.guilds.main_channel);
    var r_channel = bot.channels.cache.get(prereqs.guilds.requests_channel);
    var strings = quotes.length.toString();
    var g_count = bot.guilds.cache.size;

    console.log('Loading commands...');
    for (var i = 0; i < bot.commands.size; i++) console.log(`Command loaded: ${bot.commands.map(command => command.name)[i]}`);

    console.log(`Client set to change topic in #${m_channel.name}`);
    console.log(`Client set to send requests to #${r_channel.name}`);
    console.log(`Client loaded ${strings} quotes`);
    switch (prereqs.allowRequests)
    {
        case true:
        {
            console.log('Quote requesting is currently \x1b[32menabled\x1b[0m');
            bot.user.setPresence({ activity: { name: '+quoterules/+help' }, status: 0 });
        } break;
        case false:
        {
            console.log('Quote requesting is currently \x1b[31mdisabled\x1b[0m');
            bot.user.setPresence({ activity: { name: '[REQUESTING DISABLED] +quoterules/+help' }, status: 2 });
        } break;
    }

    bot.user.setActivity("+quoterules/+help");
    console.log(`Logged in as ${bot.user.tag}! Found in ${g_count} servers.`);

    //Slash commands
});

bot.on('message', msg => {
    if (!msg.content.startsWith(prereqs.prefix) || msg.author.bot || msg.channel.type === 'dm') return;

    const args = msg.content.slice(prereqs.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if (!bot.commands.has(command)) return;

    const { cooldowns } = bot;

    if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Discord.Collection());

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown) * 1000;

    if (timestamps.has(msg.author.id))
    {
        const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

        if (now < expirationTime)
        {
            const timeLeft = (expirationTime - now) / 1000;
            return msg.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing **+${command.name}**.`);
        }
    }

    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

	try {
		bot.commands.get(command).execute(bot, msg, args);
	} catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
});

bot.login(prereqs.token);
