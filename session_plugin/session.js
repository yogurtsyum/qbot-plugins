const discord = require("discord.js");
const path = require('path')
const db = require("../db.js")

const config = {
    description: 'starts a session',
    aliases: [],
    usage: '',
    rolesRequired: ['MANAGE_MESSAGES'],
    category: 'Roblox'
}

module.exports = {
    config,
    run: async (client, message, args) => {
  const sessiontext = await db.get('sessiontext')
  const channelId = await db.get('sessionchannel')
  if (sessiontext === null) return
  if (channelId === null) return
      let channel = message.guild.channels.cache.find(channel => channel.id === channelId);
  const msg = await channel.send(sessiontext)
  const successembed = new discord.MessageEmbed()
    .setTitle('Success!')
    .setDescription('Started session successfully!')
    .setTimestamp()
    .setColor("GREEN")
    .setFooter('qbot')
  message.channel.send(successembed)
    }
};
