const db = require('../db.js');
const roblox = require('noblox.js');

exports.run = async (client, message, args) => {
    if(!args[0]) {
        return message.channel.send("You didn't supply a Roblox username that you want to verify as!");
    }
    let username = args[0];
    let id
    try {
        id = await roblox.getIdFromUsername(username);
    } catch {
        return message.channel.send("The username suppiled above isn't available in the Roblox database!");
    }
    message.channel.send(`Please put this as your status: '${message.author.id}' and type 'ready' when done.`);
    const determine = await message.channel.awaitMessages(filter, {max: 1});
    const answer = determine.first().content;
    if(answer != "ready") {
        return message.channel.send("I'm sorry, but you didn't answer 'ready', this has been cancelled.");
    }
    if(await roblox.getStatus(id) != message.author.id) {
        return message.channel.send(`You didn't change your status to '${message.author.id}'! This has been cancelled!`);
    }
    try {
        await db.set(message.guild.id + ":" + message.author.id + "-username", username);
    } catch (err) {
        return message.channel.send("There was an error while saving data: " + err);
    }
    return message.channel.send(`Success! You have verified as ${username}!`);
}
