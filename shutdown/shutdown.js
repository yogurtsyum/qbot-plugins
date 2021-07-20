const roblox = require('noblox.js');
const Discord = require('discord.js');
const path = require('path');
require('dotenv').config();

const config = {
    description: 'Shut downs the Bot. **OWNER ONLY**',
    aliases: [],
    usage: '[command name]',
    rolesRequired: [],
    category: 'Utility'
}
 
module.exports = {
    config,
    run: async (client, message, args) => {
 
      if(message.author.id !="703212496009560156") return message.channel.send("You're not the bot owner")
 
      try {
        await message.channel.send("Bot has shut down!")
        process.exit()
      } catch(e) {
        message.channel.send("ERROR: ${e.message}")
      }
 
    }
}
