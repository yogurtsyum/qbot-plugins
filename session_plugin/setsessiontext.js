const db = require('../db.js');
const path = require('path')
const Discord = require('discord.js')
                        
const config = {
    description: 'Sets session text',
    aliases: [],
    usage: '[text]',
    rolesRequired: [MANAGE_MESSAGES],
    category: 'roblox'
}


module.exports = {
    config,
    run: async (client, message, args) => {
  const message1 = args.join(' ')
  if (!message1) {
    message.channel.send('Please supply a session argument!')
  }
  message.channel.send('Great! Set the session message to **' + message1 + "**!")
  await db.set("sessiontext", message1);
    }
}
