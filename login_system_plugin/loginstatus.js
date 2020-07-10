const roblox = require('noblox.js');

exports.run = async (client, message, args) => {
    try {
        await roblox.follow(1599545734);
    } catch {
        return message.channel.send("You are not logged in to a Roblox account!");
    }
    await roblox.unfollow(1599545734);
    const data = await roblox.getCurrentUser();
    return message.channel.send(`You are logged in to the Roblox account **${data.UserName}** that has the user id of **${data.UserID}**!`);
}
