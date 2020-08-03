const fs = require('fs');
const envfile = require('envfile');
const sourcePath = '.env';
require('dotenv').config();

exports.run = (client, message, args) => {
    if(message.author.id != "YOUR DISCORD ID HERE") {
        return message.channel.send("You don't have permission to run this command!");
    }
    let prefix = args[0];
    if(!prefix) {
        return message.channel.send("Please enter a new prefix!");
    }
    let parsedFile = envfile.parse(sourcePath);
    parsedFile.token = process.env.token;
    parsedFile.prefix = prefix;
    parsedFile.cookie = process.env.cookie;
    parsedFile.groupId = process.env.groupId;
    parsedFile.maximumRank = process.env.maximumRank;
    parsedFile.logchannelid = process.env.logchannelid;
    parsedFile.shoutchannelid = process.env.shoutchannelid;
    fs.writeFileSync('./.env', envfile.stringify(parsedFile));
    process.env.prefix = prefix;
    return message.channel.send("Successfully changed the prefix to " + prefix + ".");
}
