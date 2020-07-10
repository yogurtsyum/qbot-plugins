const db = require('../db.js');

exports.run = async (client, message, args) => {
    if(message.author.id != "DISCORD ID HERE") {
        return message.channel.send("I'm sorry, but you don't have the correct permissions to execute this command!");
    }
    let data
    try {
        data = await db.get("blacklisted");
    } catch (err) {
        return message.channel.send('There was an error: ' + err);
    }
    if(!args[0]) {
        return message.channel.send("Pleae mention a user to unblacklist!");
    }
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    let index = data.indexOf(user.id);
    if(index == -1) {
        return message.channel.send("This user isn't blacklisted!");
    }
    data.splice(index, index + 1);
    try {
        await db.set("blacklisted", data);
    } catch (err) {
        return message.channel.send('There was an error while removing this user from the blacklist: '  + err);
    }
    return message.channel.send("Successfully removed user from blacklist database!");
}
