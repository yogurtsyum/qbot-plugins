exports.run = async (client, message, args) => {
    if(message.author.id !== "YOUR DISCORD ID HERE") {
        return message.channel.send("You don't have permission to run this command!");
    }
    function setStatus(type) {
        try {
            client.user.setStatus(type);
        } catch {
            return message.channel.send("There was an error while trying to set the status: " + err);
        }
    }
    let status = args[0];
    if(!status) {
        return message.channel.send("Please provide a status for the bot to change into! Valid ones are 'online', 'idle', 'dnd', and 'invisible'");
    }
    let validStatuses = ['online', 'idle', 'dnd', 'invisible'];
    let isValidStatus = false;
    for(var i = 0; i < validStatuses.length; i++) {
        if(status === validStatuses[i]) {
            isValidStatus = true;
        }
    }
    if(isValidStatus == false) {
        return message.channel.send("This isn't a valid status!");
    }
    if(status === 'online') {
        setStatus('online');
    } else if(status === 'idle') {
        setStatus('idle');
    } else if(status === 'dnd') {
        setStatus('dnd');
    } else {
        setStatus('invisible');
    }
    return message.channel.send("Successfully changed the status!");
}
