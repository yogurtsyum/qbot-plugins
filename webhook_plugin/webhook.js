const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if(message.channel.type !== "dm") {
        message.delete();
        return message.channel.send('This command only works in DMS');
    }
    let link = args[0];
    if(!link) {
        return message.channel.send("Please provide a webhook link for me to post to!");
    }
    if(!args[1]) {
        return message.channel.send("Please provide a message for me to send to this webhook!");
    }
    let msg = args.slice(1).join(" ");
    link = link.substring(36, link.length);
    let index = 0;
    for(var i = 0; i < link.length; i++) {
        if(link.charAt(i) === "/") {
            index = i;
            break;
        }
    }
    let id = link.substring(0, index);
    let token = link.substring(index + 1, link.length);
    let webhookClient = new Discord.WebhookClient(id, token);
    webhookClient.send(msg);
    return message.channel.send("Sent!");
}
