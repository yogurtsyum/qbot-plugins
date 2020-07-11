const db = require('../db.js');

exports.run = async (client, message, args) => {
    if(message.author.id !== "DISCORD ID HERE") {
        return message.channel.send("You don't have permission to use this command.");
    }
    if(await db.get("shutdown") == false) {
        return message.channel.send("The bot isn't off.");
    }
    message.channel.send("Booting...");
    client.user.setStatus('online');
    await db.set("shutdown", false);
}
