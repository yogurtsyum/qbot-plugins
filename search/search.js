const Discord = require("discord.js");
const roblox = require("noblox.js");
const errors = require("errors.js");
module.exports = class test {
    constructor(){
            this.name = 'RobloxInfo.js • Lowered Command',
            this.alias = ['robloxinfo']
    }

async run(Client,message,args) {
      let username = args[1]
     if (username) {
       roblox.getIdFromUsername(username).then(id => { // gets user id for the specific part of the embed
         if (id) {
           roblox.getPlayerInfo(parseInt(id)).then(function(info) {
        Client.extractDate = (dateObj) => {
        let month = dateObj.getMonth()
        let day = dateObj.getDate()
        let year = dateObj.getFullYear()
        return {
          month: month + 1,
          day: day,
          year: year
        }
      }
              let date = new Date(info.joinDate) // states join date
             let dateInfo = Client.extractDate(date) 
             let embed = new Discord.RichEmbed() // starts a new embed

             .setColor('#0099ff') // sets the color of the embed
             .setURL(`https://roblox.com/users/${id}/profile`) // base link, changed by the variables 'id'
             .setTimestamp()
             .setThumbnail(`https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`) // gets the roblox profile picture
             .addField("Username", info.username || 'Unresolvable', true) // everything in the embed is undefined, therefore can be changed by the variables
             .addField("User ID", id || 'Unresolvable', true)
             .addField("Feed", info.blurb || 'Nothing', true)
             .addField("Status", info.status || 'Nothing', true)
             .addField("In group", info.group || 'N/A', true)
             .addField("Account Age", `${info.age} days old` || 'Unresolvable')
             .addField("Register Date", `${dateInfo.month}/${dateInfo.day}/${dateInfo.year}` || 'Unresolvable')
             .addField("User Link", `https://roblox.com/users/${id}/profile`)
             .setFooter(`qbot | Plugin by Roblo_Developer`);
              message.channel.send({embed})
             
          var EmbedLog = new Discord.RichEmbed()
            .setTitle(`Command logged`)
            .setColor('#0099ff')
            .setDescription(`${message.author} has used ` + "`-robloxinfo`" + ` in ${message.channel}`)
            .setFooter(`qbot | Plugin by Roblo_Developer`);
     
       let logchannel = await message.guild.channels.cache.get(
              process.env.logchannelid );
       if (!logChannel) return message.channel.send("❌ Cannot find log channel");
      logChannel.send(EmbedLog)
           })
         }

       }).catch(function (err) {
         message.channel.send("❌ Sorry, that user doesn't seem to exist, double check your spelling and try again!") // catching error
       });
    } else {
       message.channel.send("❌ Please provide a valid username, e.g. '-search ROBLOX'.") 
     }
}
}
