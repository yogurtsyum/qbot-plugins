const db = require('../db.js');

exports.run = async (client, message, args) => {
    if(message.author.id !== "DISCORD ID HERE") {
        return message.channel.send("You don't have permission to run this command.");
    }
    message.channel.send("Shutting down...");
    client.user.setStatus("invisible");
    await db.set("shutdown", true);
}
