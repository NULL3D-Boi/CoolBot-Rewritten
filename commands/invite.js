module.exports =
{
    name: 'invite',
    description: 'Invite CoolBot to your Discord server!',
    ownerOnly: false,
    execute(bot, msg, args)
    {
        msg.channel.send("https://discord.com/oauth2/authorize?client_id=622968496321724426&permissions=16384&scope=bot%20applications.commands");
    },
};