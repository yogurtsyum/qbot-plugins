const db = require('../db.js');

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_CHANNELS')) {
        return message.channel.send("You don't have permission to run this command");
    }
    if(!args[0]) {
        return message.channel.send("Please mention a channel that is going to be used for a suggestions channel!");
    }
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if(!channel) {
        return message.channel.send("The channel supplied above doesn't exist!");
    }
    try {
        await db.set("suggestionsChannel", channel.id);
    } catch (err) {
        return message.channel.send("There was an error while saving the suggestions channel to the database: " + err);
    }
    return message.channel.send("Successfully set the suggestions channel to <#" + channel.id + ">!");
}
