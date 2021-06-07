module.exports =
{
    name: 'github',
    description: "Posts a link to CoolBot's GitHub page.",
    ownerOnly: false,
    execute(bot, msg, args)
    {
        msg.channel.send('https://github.com/defnotreal/CoolBot');
    }
}