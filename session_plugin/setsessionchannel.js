const db = require('../db.js');

exports.run = async (client, message, args) => {
    if(!args[0]) {
        return message.channel.send("Please mention a channel that is going to be used for a session channel!");
    }
    let channel = message.mentions.channels.first();
    if(!channel) {
        return message.channel.send("The channel supplied above doesn't exist!");
    }
    try {
        await db.set("sessionchannel", channel.id);
    } catch (err) {
        return message.channel.send("There was an error while saving the session channel to the database: " + err);
    }
    return message.channel.send("Successfully set the session channel to <#" + channel.id + ">!");
}