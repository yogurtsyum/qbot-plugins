const roblox = require('noblox.js');
require('dotenv').config();

exports.run = async (client, message, args) => {
    if(!args[0]) {
        return message.channel.send("Please supply a Roblox user!");
    }
    let username = args[0];
    let id
    try {
        id = await roblox.getIdFromUsername(username);
    } catch {
        return message.channel.send("The mentioned Roblox username doesn't exist in the Roblox database!");
    }
    let info = [];
    let acccountInfo = await roblox.getPlayerInfo(id);
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
