const db = require('../db.js');
const roblox = require('noblox.js');
require('dotenv').config();

exports.run = async (client, message, args) => {
    let username
    try {
        username = await db.get(message.guild.id + ":" + message.author.id + "-username");
    } catch (err) {
        return message.channel.send("There was an error while getting the data: " + err);
    }
    if(username == null) {
        return message.channel.send(`You aren't verified on this bot, please run ${process.env.prefix}verify.`);
    }
    let id = await roblox.getIdFromUsername(username);
    let rankName = await roblox.getRankNameInGroup(Number(process.env.groupId), id);
    let discordRole = await message.guild.roles.cache.find(role => role.name === rankName);
    if(discordRole == null) {
        return message.channel.send("I'm sorry, but there isn't a rank in the Discord server that goes with your group role, please make one.");
    }
    let discordUser = message.guild.member(message.author);
    try {
        discordUser.roles.add(discordRole);
    } catch (err) {
        return message.channel.send("There was an error while ranking you: " + err);
    }
    return message.channel.send("You have been given your roles.");
}
