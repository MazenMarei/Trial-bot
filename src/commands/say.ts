// import { client } from "../index.js";

import { Message } from "discord.js";

export default {
	name: "say",
	aliases: ["s"],
	description: "say something",
	permissions: [""],
	roleRequired: "", // id here
	cooldown: 0, // in ms
	function: async function ({ message, args }: { message: Message; args: any }) {
		if(args.length <= 0) return message.reply({content : "please specify a message to say"})

		message.channel.send({content : args.join(" ")})

		
	},
} as any;
