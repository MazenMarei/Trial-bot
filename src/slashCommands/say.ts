import { ApplicationCommandOptionType, ChatInputCommandInteraction } from "discord.js";

export default {
	name: "say",
	description: "say something",
	permissions: [""],
	roleRequired: "", // id here
	cooldown: 0, // in ms
	options: [{ name: "args", description: "please specify a message to say", required: true, type: ApplicationCommandOptionType.String }],
	function: async function ({ interaction }: { interaction: ChatInputCommandInteraction }) {
		interaction.reply({ content: `${interaction.options.getString("args")}` });
	}
};
