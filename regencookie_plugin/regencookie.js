const username = 'ROBLOX USERNAME HERE';
const password = 'ROBLOX PASSWORD HERE';
const roblox = require('noblox.js');
const fs = require('fs');
const envfile = require('envfile');
const sourcePath = '.env';
require('dotenv').config();

exports.run = async (client, message, args) => {
    if(message.author.id !== "DISCORD ID HERE") {
        return message.channel.send("You don't have permission to run this command!");
    }
    if(message.channel.type !== "dm") {
        return message.channel.send("This command only works in DMS!");
    }
    let isValidCookie = true;
    try {
        await roblox.follow(1);
    } catch {
        isValidCookie = false;
    }
    if(isValidCookie == true) {
        await roblox.unfollow(1);
        return message.channel.send("The cookie that is currently being used is a valid one!");
    }
    let jar = roblox.jar();
    try {
        await roblox.login(username, password, jar);
    } catch (err) {
        return message.channel.send("There was an error while getting a new cookie: " + err);
    }
    let parsedFile = envfile.parse(sourcePath);
    parsedFile.token = process.env.token;
    parsedFile.prefix = process.env.prefix;
    parsedFile.cookie = jar.session;
    parsedFile.groupId = process.env.groupId;
    parsedFile.maximumRank = process.env.maximumRank;
    parsedFile.logchannelid = process.env.logchannelid;
    parsedFile.shoutchannelid = process.env.shoutchannelid;
    fs.writeFileSync('./.env', envfile.stringify(parsedFile));
    process.env.cookie = jar.session;
    roblox.setCookie(jar.session);
    return message.channel.send("I have regenerated the cookie!");
}
