const db = require('../db.js');

exports.run = async (client, message, args) => {
    if(message.author.id != "CHANGE THIS TO YOUR DISCORD ID") {
        return message.channel.send("I'm sorry, but you don't have the correct permissions to execute this command!");
    }
    message.channel.send("WARNING! Continuing on with the request, this will WIPE all data from the database with 0% of getting the data back. If you wish to continue, please type 'yes'");
    const filter = m => m.author.id === message.author.id;
    const determine = await message.channel.awaitMessages(filter, {max: 1});
    const answer = determine.first().content;
    if(answer != "yes") {
        return message.channel.send("You didn't answer the question with 'yes'. This operation has been cancelled!");
    }
    message.channel.send("Attempting to clear the database...");
    try {
        await db.clear();
    } catch (err) {
        return message.channel.send("There was an error while clearing the database: " + err);
    }
    return message.channel.send("Successfully cleared the database!");
}
