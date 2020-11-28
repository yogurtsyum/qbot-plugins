const discord = require("discord.js");
const request = require("request");
const chalk = require('chalk')

exports.run = async (client, message, args, db) => {
  const sessiontext = await db.get('sessiontext')
  console.log(sessiontext)
  const channelId = await db.get('sessionchannel')
      let channel = message.guild.channels.cache.find(channel => channel.id === channelId);
  const msg = await channel.send(sessiontext)
  const successembed = new discord.MessageEmbed()
    .setTitle('Success!')
    .setDescription('Started session successfully!')
    .setTimestamp()
    .setColor("GREEN")
    .setFooter('lua#2400')
  message.channel.send(successembed)
};