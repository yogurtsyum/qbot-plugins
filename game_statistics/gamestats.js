// Created by Nicklaus_s (Roblox)
// You may change any of the footers, but please DO NOT claim you wrote this code as it is completely immature and rude.

const Discord = require('discord.js');
const Roblox = require('noblox.js');

exports.run = async (client, message, args) => {
    let placeInfo = (await Roblox.getPlaceInfo(gameId));

    message.channel.send({embed: {
        color: 8716032,
        author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
        },
        title: `**Game Statistics:**`,
        description: `Player Count: ${placeInfo.OnlineCount} \n Visited Count: ${placeInfo.VisitedCount} \nFavorited Count: ${placeInfo.FavoritedCount} \nUpvote Count: ${placeInfo.TotalUpVotes} \nDownvote Count: ${placeInfo.TotalDownVotes}`,
        footer: {
            text: `Game Statistics Plugin | nicklaus#5400`
        }
    }});
};
