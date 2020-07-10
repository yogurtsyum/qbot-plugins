
const db = require('../db.js');
const roblox = require('noblox.js');
require('dotenv').config();

exports.run = async (client, message, args) => {
    if(!args[0]) {
        return message.channel.send("Please tag a Discord user in this server or supply a Discord ID!")
    }
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    if(!user) {
        return message.channel.send("The user mentioned above isn't in the server!");
    }
    let username
    try {
        username = await db.get(message.guild.id + ":" + user.id + "-username");
    } catch (err) {
        return message.channel.send("There was an error while getting data: " + err);
    }
    if(username == null) {
        return message.channel.send("This user isn't verified!");
    }
    let id = await roblox.getIdFromUsername(username);
    let info = [];
    let accountInfo = await roblox.getPlayerInfo(id);
    info.push(`Roblox username: ${username}`);
    info.push(`Roblox ID: ${id}`);
    info.push(`Roblox join date: ${acccountInfo.joinDate}`);
    info.push(`Roblox account age: ${acccountInfo.age}`);
    info.push(`Roblox status: ${await roblox.getStatus(id)}`);
    info.push(`Roblox blurb: ${await roblox.getBlurb(id)}`);
    info.push(`Roblox group rank name: ${await roblox.getRankNameInGroup(Number(process.env.groupId), id)}`);
    info.push(`Roblox group rank ID: ${await roblox.getRankInGroup(Number(process.env.groupId), id)}`);
    return message.channel.send(info);
}
