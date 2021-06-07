module.exports =
{
    name: 'twitter',
    description: 'Posts a link to CoolBot for Twitter.',
    ownerOnly: false,
    execute(bot, msg, args)
    {
        msg.channel.send("https://twitter.com/CoolBot_Twt");
    },
};