const { getGroup } = require("noblox.js")

const config = {
    description: 'Sends the membercount of the discord server and roblox group.',
    aliases: [],
    usage: '',
    rolesRequired: [],
    category: 'Utility'
}
  
module.exports = {
    config,
    run: async (client, message, args) => {
        const discordMembers = await message.guild.memberCount
        const robloxMembers = (await getGroup(client.config.groupId)).memberCount
        message.channel.send({embed: {
            color: 39423,
                fields: [
                    {
                        name: `Discord Members`,
                        value: discordMembers,
                        inline: true
                    },
                    {
                        name: `Roblox Members`,
                        value: robloxMembers,
                        inline: true
                    }
                ],
            timestamp: new Date(),
        }})
    }
}