exports.run = async (client, message, args) => {
    if(!message.channel.deletable) {
        return message.channel.send("I don't have permission to run this command! Please ensure that I have the 'Manage Channels' permission!");
    }
    message.channel.delete();
    let clone = await message.channel.clone();
    return clone.send('Nuked channel!');
}
