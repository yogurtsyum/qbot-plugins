const roblox = require('noblox.js');

exports.run = async (client, message, args) => {
    if(message.author.id != "PUT YOUR DISCORD ID HERE") {
        return message.channel.send("You don't have permission to run this command!");
    }
    try {
        await roblox.follow(1599545734);
    } catch {
        return message.channel.send("You are not logged in to a Roblox account!");
    }
    await roblox.unfollow(1599545734);
    try {
        await roblox.login("h", "h");
    } catch (err) {
        return message.channel.send("There was an error while logging out: " + err);
    }
    return message.channel.send("You have logged out of the account!");
}
