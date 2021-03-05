const { MessageEmbed } = require("discord.js")

const config = {
  description: 'DMs others using the bot.',
  aliases: [],
  usage: '<member> <message>',
  rolesRequired: ["DM Permissions"],
  category: 'Utility'
}

module.exports = {
    config,
    run: async (client, message, args) => {
        const embed = new MessageEmbed().setColor(client.config.colors.error).setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        let mention = message.mentions.members.first()
        if(!mention && !isNaN(args[0]) && args[0]) try {mention = await client.users.fetch(args[0])} catch (err) {}
        if(!mention && args[0] && isNaN(args[0])) try {mention = await message.guild.members.fetch({query: args[0], limit: 1})} catch (err) {}
        if(!mention) {embed.setDescription("You did not provide anyone to DM!"); return message.channel.send(embed)}
        mention = message.guild.member(mention)
        if(!mention) {embed.setDescription("I cannot DM this person as they are not in the server!"); return message.channel.send(embed)}
        const toSend = args.slice(1).join(" ")
        if(!toSend) {embed.setDescription("You did not provide what to send!"); return message.channel.send(embed)}
        let success = true
        try {
            await mention.send(`**${message.member.displayName}:** ${toSend}`)
        } catch (error) {
            success = false
        }
        if(success) {embed.setDescription("Successfully sent the DM!").setColor("GREEN")} else {embed.setDescription("That person does not have their DMs on!")}
        message.channel.send(embed)
        if(!success) return
        if(client.config.logChannelId == "false") return
        let logchannel = await client.channels.fetch(client.config.logChannelId)
        embed.setDescription(`**Moderator:** <@${message.author.id}> (\`${message.author.id}\`)\n**Action:** DM\n**User:** <@${mention.id}> (\`${mention.id}\`)\n**Message:** ${toSend}`)
             .setColor(client.config.colors.info)
             .setTimestamp()
             .setThumbnail(mention.user.displayAvatarURL({dynamic: true}))
        return logchannel.send(embed)
    }
}