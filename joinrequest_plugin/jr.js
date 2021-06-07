const { MessageEmbed } = require('discord.js')
const { onJoinRequestHandle } = require("noblox.js")


exports.run = async (client, message, args) => {
    let joinRequest = await onJoinRequestHandle(args[0])
    joinRequest.on('data', async (data) => {
        const Embed = new MessageEmbed()
        .setAuthor('Join Request System', 'https://img.icons8.com/plasticine/2x/settings.png')
        .addField("Date", Date.now(data.created), true)
        .addField("Requester Name", data.requester.username, true)
        .setColor("RANDOM")
        .setTimestamp(Date.now())
        .setFooter(client.user.username,client.user.displayAvatarURL())
        process.env.logWebhook.send(Embed)
        setTimeout(() => {}, 30000)
    })
}
