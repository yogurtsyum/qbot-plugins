const { MessageEmbed } = require("discord.js")

const config = {
    description: 'Mute\'s the mentioned member with the reason if provided.',
    aliases: ['m'],
    usage: '<member> [reason]',
    rolesRequired: [],
    category: 'Moderation'
}

module.exports = {
    config,
    run: async (client, message, args) => {
        const embed = new MessageEmbed().setColor(client.config.colors.error).setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        if(message.member.roles.cache.some(role => ["Mute Permissions"].includes(role.name))) {embed.setDescription("You need the `Mute Permissions` role to use this command!"); return message.channel.send(embed)}
        if(!message.guild.me.hasPermission("MANAGE_ROLES")) {embed.setDescription("I do not have permission to manage roles! Please give me the `MANAGE_ROLES` permission!"); return message.channel.send(embed)}
        let mention = message.mentions.members.first()
        if(!mention && !isNaN(args[0]) && args[0]) try {mention = await client.users.fetch(args[0])} catch (err) {}
        if(!mention && args[0] && isNaN(args[0])) try {mention = await message.guild.members.fetch({query: args[0], limit: 1})} catch (err) {}
        if(!mention) {embed.setDescription("You did not provide anyone to mute!"); return message.channel.send(embed)}
        mention = message.guild.member(mention)
        if(!mention) {embed.setDescription("I cannot mute this person as they are not in the server!"); return message.channel.send(embed)}
        if(mention.id === message.author.id) {embed.setDescription("You cannot mute yourself!"); return message.channel.send(embed)}
        if(!message.member.roles.highest.position > mention.roles.highest.position) {embed.setDescription("Your highest role is too low to mute this member!"); return message.channel.send(embed)}
        if(!mention.manageable) {embed.setDescription("I cannot manage this member! Please insure my role is higher than who you mentioned!"); return message.channel.send(embed)}
        if(!client.config.mutedRole) {embed.setDescription("There is no muted role in the config.js file! Plesae add the following to your config.js file: ```js\nmutedRole: \"muted role ID here\"```"); return message.channel.send(embed)}
        if(!message.guild.roles.cache.get(client.config.mutedRole)) {embed.setDescription("The muted role ID in the config.js file is not valid! Please put a valid role ID!"); return message.channel.send(embed)}
        if(mention.roles.cache.some(role => client.config.mutedRole === role.id)) {embed.setDescription("That person is already muted!"); return message.channel.send(embed)}
        let good = true
        try {await mention.roles.add(client.config.mutedRole, `${args.slice(1).join(" ") ? `${message.author.tag} (${message.author.id}) Muted this user with the following reason:\n${args.slice(1).join(" ")}` : `${message.author.tag} (${message.author.id}) Muted this user with no reason.`}`)} catch (error) {console.log(err); good = false}
        if(good) {embed.setDescription(`Successfully muted ${mention}!`).setColor(client.config.colors.success)} else {embed.setDescription('Oops! An unexpected error has occured. The bot owner can check the bot logs for more information.')}
        message.channel.send(embed)
        if(!good) return
        if(client.config.logChannelId == "false") return
        let logchannel = await client.channels.fetch(client.config.logChannelId)
        embed.setDescription(`**Moderator:** <@${message.author.id}> (\`${message.author.id}\`)\n**Action:** Mute\n**User:** <@${mention.id}> (\`${mention.id}\`)\n**Reason:** ${args.slice(1).join(" ") ? args.slice(1).join(" ") : `No reason provided!`}`)
             .setColor(client.config.colors.info)
             .setTimestamp()
             .setThumbnail(mention.user.displayAvatarURL({dynamic: true}))
        return logchannel.send(embed)
    }
}
