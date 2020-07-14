const db = require('../db.js');
require('dotenv').config();

exports.run = async (client, message, args) => {
    let array = await db.get("memes") || [];
    let mode = args[0];
    if(mode === "add") {
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send("You don't have permission to run this command");
        }
        let meme = args[1];
        if(!meme) {
            return message.channel.send("You didn't supply a new meme :(");
        }
        let index = array.indexOf(meme);
        if(index != -1) {
            return message.channel.send("This link is already stored in the meme database!");
        }
        if(meme.substring(0, 8) !== "https://") {
            return message.channel.send("This isn't a valid link!");
        }
        array.push(meme);
        db.set("memes", array);
        message.delete();
        return message.channel.send("Added meme!");
    }
    if(mode === "remove") {
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send("You don't have permission to run this command");
        }
        let deletedMeme = args[1];
        if(!deletedMeme) {
            return message.channel.send("Please send a meme link from the meme database to remove!");
        }
        let index2 = array.indexOf(deletedMeme);
        if(index2 == -1) {
            return message.channel.send("This link isn't in the meme database!");
        }
        array.splice(index2, index2 + 1);
        db.set("memes", array);
        message.delete();
        return message.channel.send("Removed meme!");
    }
    if(array.length == 0) {
        return message.channel.send(`There are no memes :( Why don't you add one with ${process.env.prefix}meme add <meme>?`);
    }
    let index3 = Math.round(Math.random() * array.length);
    return message.channel.send(array[index3]);
}
