const roblox = require('noblox.js');
require('dotenv').config();

exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(role => ['Get Join Logs Permission'].includes(role.name))) {
        return message.channel.send("I'm sorry, but you don't have permission to run this command. Please ensure you have the 'Get Join Logs Permission' role");
    }
    let groupid = Number(process.env.groupId);
    try {
        let joins = await roblox.getJoinRequests(groupid);
        let joinsData = joins.data;
        let returnData = [];
        for(var i = 0; i < joinsData.length; i++) {
            returnData.push(joinsData[i].requester.username);
        }
    } catch (err) {
        return message.channel.send("There was an error while getting join requests: " + err);
    }
    message.channel.send("**These users have active join requests!**");
    return message.channel.send(returnData);
}
