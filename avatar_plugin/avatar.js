const config = {
    description: 'Sends your avatar or the mentioned member\'s avatar.',
    aliases: [],
    usage: '[member]',
    rolesRequired: [],
    category: 'Utility'
}
  
module.exports = {
    config,
    run: async (client, message, args) => {
        let mention = message.mentions.members.first()
        if(!mention && !isNaN(args[0]) && args[0]) try {mention = await client.users.fetch(args[0])} catch (err) {}
        if(!mention && args[0] && isNaN(args[0])) try {mention = await message.guild.members.fetch({query: args[0], limit: 1})} catch (err) {}
        if(!mention) mention = message.author
        if(mention.roles) mention = mention.user
        return message.channel.send({embed: {
            title: 'Avatar',
            image: {
                url: mention.displayAvatarURL({format: 'png', dynamic: true, size: 256})
            }, 
            author: {
                name: message.author.tag,
                icon_url: mention.displayAvatarURL({dynamic: true})
            }
        }})
    }
}