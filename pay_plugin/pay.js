const roblox = require('noblox.js');
require('dotenv').config();

exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(role => ['Payment Permissions'].includes(role.name))) {
        return message.channel.send("I'm sorry, but it seems like you don't have the correct permissions to run this command. Please ensure that you have the 'Payment Permissions' role");
    }
    if(!args[0]) {
        return message.channnel.send("Please input a Roblox username!");
    }
    let username = args[0];
    let id;
    try {
        id = await roblox.getIdFromUsername(username)
    } catch {
        return message.channel.send("I'm sorry, but the username provided above isn't in the Roblox database!");
    }
    if(!args[1]) {
        return message.channel.send("Please enter the amount of robux you want to give to this user!");
    }
    if(isNaN(args[1])) {
        return message.channel.send("The value that you supplied is not a number, please input a number.");
    }
    let amount = args[1];
    message.channel.send(`Attempting to pay ${username} ${amount} of robux from group ${Number(process.env.groupId)}!`);
    try {
        await roblox.groupPayout(Number(process.env.groupId), id, amount);
    } catch (err) {
        return message.channel.send(`There was an error while paying ${username} ${amount} of Robux from group ${Number(process.env.groupId)}: ` + err);
    }
    return message.channel.send(`Successfully payed ${username} ${amount} of Robux from group ${Number(process.env.groupId)}!`);
}
