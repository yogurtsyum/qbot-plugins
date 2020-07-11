const roblox = require('noblox.js');
const fs = require('fs');
require('dotenv').config();

exports.run = async (client, message, args) => {
    if(message.author.id != "DISCORD ID HERE") {
        return message.channel.send("You don't have permission to run this command!");
    }
    if(message.channel.type !== "dm") {
        return message.channel.send("This command only works in DMS!");
    }
    let cookie = process.env.cookie;
    let isValidCookie = true;
    try {
        await roblox.setCookie(cookie);
    } catch {
        isValidCookie = false;
    }
    if(isValidCookie == true) {
        return message.channel.send("The cookie that is currently being used is a valid one!");
    }
    if(!args[0]) {
        return message.client.send("Please insert a username!");
    }
    try {
        await roblox.getIdFromUsername(args[0]);
    } catch {
        return message.channel.send("The username you provided doesn't exist in the Roblox database!");
    }
    if(!args[1]) {
        return message.channel.send("Please insert a password!");
    }
    let username = args[0];
    let password = args[1];
    let jar = roblox.jar();
    try {
        await roblox.login(username, password, jar);
    } catch (err) {
        return message.channel.send("There was an error while getting a new cookie: " + err);
    }
    process.env.cookie = jar.session;
    roblox.setCookie(jar.session);
    return message.author.send("I have set the session's cookie to the working cookie, which means that the env file cookie is still the same. If you want to update that, please set the cookie value to " + jar.session);
}
