require('dotenv').config();
onst fetch = require("node-fetch")

exports.run = async (client, message, args) => {
  const { memberCount } = await fetch(`https://groups.roblox.com/v1/groups/7101928`).then(response => response.json());
  message.channel.send({embed: {
    color: "RANDOM",
    description: `There are ${memberCount} group members!`,
    author: {
      name: message.author.tag,
      icon_url: message.author.displayAvatarURL()
    }
  }})
};
