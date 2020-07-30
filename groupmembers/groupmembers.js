require('dotenv').config();

exports.run = async (client, message, args) => {
  const fetch = require("node-fetch")
  var request = require("request")
  function getData(field) {
    return new Promise((resolve, reject) => {
      request(
        { uri: `https://groups.roblox.com/v1/groups/${process.env.groupId}` },
        function (error, response, body) {
          if (response.statusCode == 200) resolve(JSON.parse(body)[field])
          else reject("Something went wrong!")
        }
      );
    });
  }
  getData("memberCount").then((groupMembers) => message.channel.send({
    embed: {
      description: `The group has  **` + groupMembers + `** members!`,
      color: `RANDOM`,
      author: {
        name: message.author.tag,
        icon_url: message.author.displayAvatarURL()
      }
    }
  }))
};
