const { MessageEmbed } = require("discord.js")

const config = {
    description: 'Ban\'s the mentioned member with the reason if provided.',
    aliases: ['b'],
    usage: '<member> [reason]',
    rolesRequired: [],
    category: 'Moderation'
}

module.exports = {
    config,
    run: async (client, message, args) => {
        const embed = new MessageEmbed().setColor(client.config.colors.error).setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        if(!message.member.hasPermission("BAN_MEMBERS")) {embed.setDescription("You need the `BAN_MEMBERS` permission to use this command!"); return message.channel.send(embed)}
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) {embed.setDescription("I do not have permission to ban people! Please give me the `BAN_MEMBERS` permission!"); return message.channel.send(embed)}
        let mention = message.mentions.members.first()
        if(!mention && !isNaN(args[0]) && args[0]) try {mention = await client.users.fetch(args[0])} catch (err) {}
        if(!mention && args[0] && isNaN(args[0])) try {mention = await message.guild.members.fetch({query: args[0], limit: 1})} catch (err) {}
        if(!mention) {embed.setDescription("You did not provide anyone to ban!"); return message.channel.send(embed)}
        let user = message.guild.member(mention)
        if(user) mention = user
        let banned
        try {banned = await message.guild.fetchBan(mention.id)} catch (err) {}
        if(banned) {embed.setDescription("That person is already banned!"); return message.channel.send(embed)}
        if(mention.id === message.author.id) {embed.setDescription("You cannot ban yourself!"); return message.channel.send(embed)}
        if(mention.roles && !message.member.roles.highest.position > mention.roles.highest.position) {embed.setDescription("Your highest role is too low to ban this member!"); return message.channel.send(embed)}
        if(mention.roles && !mention.bannable) {embed.setDescription("I cannot ban this member! Please insure my role is higher than who you mentioned!"); return message.channel.send(embed)}
        let good = true
        try {await message.guild.members.ban(mention, {reason: `${args.slice(1).join(" ") ? `${message.author.tag} (${message.author.id}) Banned this user with the following reason:\n${args.slice(1).join(" ")}` : `${message.author.tag} (${message.author.id}) Banned this user with no reason.`}`})} catch (error) {console.log(err); good = false}
        if(good) {embed.setDescription(`Successfully banned ${mention.tag? mention.tag : mention.user.tag}!`).setColor(client.config.colors.success)} else {embed.setDescription('Oops! An unexpected error has occured. The bot owner can check the bot logs for more information.')}
        message.channel.send(embed)
        if(!good) return
        if(client.config.logChannelId == "false") return
        let logchannel = await client.channels.fetch(client.config.logChannelId)
        embed.setDescription(`**Moderator:** <@${message.author.id}> (\`${message.author.id}\`)\n**Action:** Ban\n**User:** <@${mention.id}> (\`${mention.id}\`)\n**Reason:** ${args.slice(1).join(" ") ? args.slice(1).join(" ") : `No reason provided!`}`)
             .setColor(client.config.colors.info)
             .setTimestamp()
             .setThumbnail(mention.user.displayAvatarURL({dynamic: true}))
        return logchannel.send(embed)
    }
}