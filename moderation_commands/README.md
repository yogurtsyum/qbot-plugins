<h1 align="center">Moderation Commands</h1>

---

<p align="center">This plugin allows you to mute, unmute, ban, and kick people using your bot. If you find any issues with any of these command, report them to Anonymous on the support server.</p>

## Instalation
* Open the bot terminal/repl.it shell.
* Run `wget -O commands/mute.js https://raw.githubusercontent.com/yogurtsyum/qbot-plugins/master/moderation_commands/mute.js`
* Run `wget -O commands/unmute.js https://raw.githubusercontent.com/yogurtsyum/qbot-plugins/master/moderation_commands/unmute.js`
* Run `wget -O commands/ban.js https://raw.githubusercontent.com/yogurtsyum/qbot-plugins/master/moderation_commands/ban.js`
* Run `wget -O commands/kick.js https://raw.githubusercontent.com/yogurtsyum/qbot-plugins/master/moderation_commands/kick.js`
* Run `wget -O moderation_plugin_LICENSE https://raw.githubusercontent.com/yogurtsyum/qbot-plugins/master/moderation_commands/LICENSE`
* Go to your config.js file and add the following to your config.js file: 
```js
mutedRole: "muted role ID here"
```
<p style="font-size:10pt;">If you have red lines, insure you have a comma above this line.</p>

* Restart the bot.

## How to use
Read below to know how to use the commands.

### Terms
* \<member> can be a mention, id, or one word with no spaces of someones name
* \<reason> can be any reason you want
* \<prefix> is whatever you have as your prefix in the .config file

### Usage
* \<prefix>mute \<member> \<reason>
* \<prefix>unmute \<member> \<reason>
* \<prefix>ban \<member> \<reason>
* \<prefix>kick \<member> \<reason>
