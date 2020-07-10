const db = require('../db.js');

exports.run = async (client, message, args) => {
    if(!args[0]) {
        return message.channel.send("Please say something to suggest!");
    }
    let msg = args.join(" ");
    let channelId = await db.get("suggestionsChannel");
    if(channelId == null) {
        return message.channel.send("You didn't set a suggestion channel for this bot! Please do so by runnning the suggestionchannel command!");
    }
    let channel = message.guild.channels.cache.find(channel => channel.id === channelId);
    let suggestion = await channel.send(msg);
    await suggestion.react("✔️");
    await suggestion.react("❌");
    return message.channel.send("Success! You have sent your suggestion in for the community to vote on!");
}
