const roblox = require('noblox.js');

exports.run = async (client, message, args) => {
    if(message.author.id != "PUT YOUR DISCORD ID HERE") {
        return message.channel.send("You don't have permission to run this command!");
    }
    if(message.channel.type !== "dm") {
        return message.channel.send("This command only works with the DMs of the bot!");
    }
    let username = args[0];
    let password = args[1];
    if(!username) {
        return message.channel.send("A username arguement is required!");
    }
    if(!password) {
        return message.channel.send("A password arguement is required!");
    }
    let id
    try {
        id = await roblox.getIdFromUsername(username);
    } catch {
        return message.channel.send("The username provided isn't in the Roblox database!");
    }
    message.channel.send(`Attempting to login to the Roblox account **${username}** with the password **${password}**...`);
    try {
        await roblox.login(username, password);
    } catch (err) {
        return message.channel.send("There was an error while logging in: " + err);
    }
    return message.channel.send(`You have logged in to the account **${username}**.`);
}
