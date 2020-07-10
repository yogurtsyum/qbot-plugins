const roblox = require('noblox.js');
require('dotenv').config();
const suspendedRank = 1; // CHANGE THIS TO THE SUSPENDED RANK ID

exports.run = async (client, message, args) => {
    if(!args[0]) {
        return message.channel.send("Please provide a user to suspend!");
    }
    let groupid = Number(process.env.groupId);
    let username = args[0];
    let id;
    try {
        id = await roblox.getIdFromUsername(username);
    } catch {
        return message.channel.send("The username supplied above doesn't exist in the Roblox database!");
    }
    let oldRankName = await roblox.getRankNameInGroup(groupid, id);
    let oldRankId = await roblox.getRankInGroup(groupid, id);
    try {
        await roblox.setRank(groupid, id, suspendedRank);
    } catch (err) {
        return message.channel.send("Opps! There was an error while exeucting the command: " + err);
    }
    return message.channel.send(`Success! You have suspended ${username} from ${oldRankName} (${oldRankId})!`);
}
