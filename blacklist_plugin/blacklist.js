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
    if(data == null) {
        data = [];
    }
    if(!args[0]) {
        return message.channel.send("Please mention a user to blacklist!");
    }
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    data.push(user.id);
    try {
        await db.set("blacklisted", data);
    } catch (err) {
        console.log('There was an error while adding this user to the blacklist: '  + err);
        return message.channel.send("There was an error while adding this user to the blacklist!");
    }
    return message.channel.send("Successfully added user to blacklist database!");
}
