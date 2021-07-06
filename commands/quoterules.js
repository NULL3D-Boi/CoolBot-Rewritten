const fs = require('fs');

module.exports =
{
    name: 'quoterules',
    description: 'List the rules to follow when requesting quotes.',
    ownerOnly: false,
    cooldown: 1,
    execute(bot, msg, args)
    {
        msg.channel.send(fs.readFileSync('/root/coolbot/quoterules.txt', 'utf8'));
    },
};