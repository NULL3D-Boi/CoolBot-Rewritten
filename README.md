# CoolBot

### Synopsis
CoolBot is a bot mainly used for Discord users to add quotes for the bot to use on command. The Discord bot also works in tandem with a Twitter bot, as quotes requested on Discord, if added to the bot, can also be displayed on Twitter.

The bot accepts quotes in the form of text or images and videos through links to various social media sites and picks one quote at random to send into a Discord server with the command +quote, and users can request that a quote be added with the command +requestquote followed by their quote. Requested quotes are looked at by the bot's owner to decide if it should be added. A very brief set of rules for requesting quotes can be found by typing +quoterules.

Special thanks to [@Reaxt](https://github.com/Reaxt) for helping me wring out some kinks in the code while I was making this stupid thing. Without her assistance, I probably wouldn't have been able to put in some of the features CoolBot has now. Reaxt, you kick MAD ass!

### Before we start...
First of all, let's get this out of the way: I don't care about what you do with this code so long as it's not done for profit and I still get credit for the creation of the original project. **Please do not take my Twitter link out of the `help` command!!**

It would also be greatly appreciated if you open-sourced your project, but this isn't required.
All-in-all, just play fair!

Also, the Twitter bot will not be a part of this repository because, despite it being a request from a few users, it was sort of an afterthought and is a completely different beast code-wise compared to the Discord bot.

Finally, for something a little stupid: you may notice that CoolBot sometimes sends [this GIF](https://tenor.com/view/troll-face-rage-comics-trolled-meme-gif-19882304). Obviously, this is a dumb way of telling users they don't have access to owner-only commands. I really don't think this needed to be explained, but hey, better safe than sorry.

### Prerequisites
The following NodeJS modules are REQUIRED to successfully run a CoolBot clone:
* Discord.js
* FS
* Cron
* hastebin-gen

You'll also want to make a config file named `prereqs.json`. This file is essential, as it houses many important aspects of the bot, such as the bot token, some Discord IDs, the quotes array, so on and so forth.

Here's a template for your file:
```
{
  "token": "",
  "owner_id": "",
  "prefix": "+",
  "guilds": {
    "main_channel": "",
    "requests_channel": ""
  },
  "allowRequests": true,
  "quotes": [
    //Quotes will be added to this array when the addquote command is used on Discord
  ]
}
```
Of course, you're free to add to, remove to, and edit your JSON file as you see fit.

Also, there's a function for changing a specific channel's topic to a random quote every night at midnight. You can either disable this by removing the `topicChange` Cron job in `bot.js` or you can configure it to a channel of your choice by changing the `main_channel` variable in `prereqs.json`, so long as your bot has permission to manage channels in the server your channel is in.

Keep in mind, though: this MAY become a publicly usable feature in the future. If this happens, this section will be removed from the README.

``requests_channel`` is a variable meant to house the ID for the Discord channel all requests will be sent to by your bot. You might want to make sure this specific channel is something only you or anyone you trust should be able to see.

### Commands
Commands should be pretty straightforward to add. Every usable command in CoolBot will be a part of this repository, but here's a template for a new command in case you need it:
```
module.exports =
{
  name: '',
  description: '',
  ownerOnly: false,
  //cooldown: 0,
  execute(bot, msg, args)
  {
    //Add your code here
  }
}
```
Also, as you can see in the commands that manage quotes, make sure you're calling `prereqs.json` and/or any modules you need in your file, otherwise your command will return an error.

### Final words
I'll be sure to update this README as I see fit, because despite this bot being basically finished, I still like to add some quality-of-life shit to it once in a while. If you have any question or concerns, let me know on my [Twitter](https://twitter.com/defnotreal_) or friend me on Discord: defnotreal_#5123.

Thanks for taking a look at this stupid little bot I made, and hopefully my shitty code helps you out in any way. Take it easy.
