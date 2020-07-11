require('dotenv').config();

exports.run = (client, message, args) => {
    if(message.author.id != "YOUR DISCORD ID HERE") {
        return message.channel.send("You don't have permission to run this command!");
    }
    let prefix = args[0];
    if(!prefix) {
        return message.channel.send("Please enter a new prefix!");
    }
    process.env.prefix = prefix;
    return message.channel.send("Successfully changed the prefix to " + prefix + ". This will be reverted back to the prefix set in the env file when the bot restarts.");
}
