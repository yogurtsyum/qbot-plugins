exports.run = async(client, message, args) =>{
const { MessageEmbed } = require('discord.js')
const e = new MessageEmbed()
.setColor('RANDOM')
.setTitle('Test')
.setDescription('This is a test.')
.addField('Test Activated By:',`${message.author}`,true)
.setTimestamp()
message.channel.send(e)
}
