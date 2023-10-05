import { ApplicationCommandOptionType, ChatInputCommandInteraction } from "discord.js";

export default {
	name: "ping",
	description: "ping command",
	permissions: [""],
	roleRequired: "", // id here
	cooldown: 0, // in ms
	function: async function ({ interaction }: { interaction: ChatInputCommandInteraction }) {
		interaction.reply({ content: `Pong!🫡` });
	}
};
