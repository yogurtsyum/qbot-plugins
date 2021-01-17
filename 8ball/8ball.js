const Discord = require('discord.js');

const config = {
	description: 'A magic 8ball for you to ask questions to.',
	aliases: ['8ball', 'ball'],
	usage: '<question>',
	rolesRequired: ['@everyone'],
	category: 'Fun'
}

module.exports = {
	config,
	run: async (client, message, args) => {

		if (!args[0]) return message.reply("Please ask a question!");

		let replies = ["Yes.", "No.", "Ask again later.", "Maybe.", "Yes and definitely.", "It is certain.", "As I see it, yes.", "Very doubtful.", "Eh I will say yes to that.", "NO!", "Never.", "Nope."];

		let result = Math.floor((Math.random() * replies.length));
		let question = args.slice(0).join(" ");

		let ballembed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag)
			.setColor("#FF9900")
			.addField("Question", question)
			.addField("Answer", replies[result])
			.setFooter(`qbot plugin by bigbenster702`);

		message.channel.send(ballembed)
	}
}
