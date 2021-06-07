module.exports =
{
    name: 'discord',
    description: 'Posts an invite to the CoolBot Discord server.',
    ownerOnly: false,
    execute(bot, msg, args)
    {
        msg.channel.send("https://discord.gg/sGDtFaSpw7");
    },
};