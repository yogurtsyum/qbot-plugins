const db = require('../db.js');

exports.run = async (client, message, args) => {
  const message1 = args.join(' ')
  if (!message1) {
    message.channel.send('Please supply a session argument!')
  }

  if (message1) {
  message.channel.send('Great! Set the session message to **' + message1 + "**!")
  await db.set("sessiontext", message1);
  console.log("set the session msg to" + message1)
  }
}