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
    message.channel.send(`Is the Roblox account: ${username} above the age of 13?`);
    const filter = m => m.author.id === message.author.id;
    const determine = await message.channel.awaitMessages(filter, {max: 1});
    const answer = determine.first().content;
    if(!answer == "yes" || !answer == "no") {
        return message.channel.send("I'm sorry, but you didn't answer 'yes' or 'no', this has been cancelled.")
    }
    if(answer == "yes") {
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
    const verifyStatus = "dog cat turtle woof cup tea bottle";
    message.channel.send(`Please put this as your status: '${verifyStatus}' and type 'ready' when done.`);
    const determine2 = await message.channel.awaitMessages(filter, {max: 1});
    const answer2 = determine2.first().content;
    if(answer2 != "ready") {
        return message.channel.send("I'm sorry, but you didn't answer 'ready', this has been cancelled.");
    }
    if(await roblox.getStatus(id) != verifyStatus) {
        return message.channel.send(`You didn't change your status to '${verifyStatus}'! This has been cancelled!`);
    }
    try {
        await db.set(message.guild.id + ":" + message.author.id + "-username", username);
    } catch (err) {
        return message.channel.send("There was an error while saving data: " + err);
    }
    return message.channel.send(`Success! You have verified as ${username}!`);
}
