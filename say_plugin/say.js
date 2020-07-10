exports.run = (client, message, args) => {
  if(!args[0]) {
    message.channel.send("Please input a phrase or word for me to say!");
    message.delete();
  } else {
    let msg = args.slice(0).join(" ");
    message.channel.send(`<@${message.author.id}> has made me say this: ${msg}`);
    message.delete();
  }
}
