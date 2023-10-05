import { ApplicationCommandOptionType, ChatInputCommandInteraction } from "discord.js";
import { APIActionRowComponentTypes, ActionRowBuilder, AnyAPIActionRowComponent, AnyComponent, AnyComponentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message } from "discord.js";

export default {
	name: "avatar",
	description: "user's avatar",
	permissions: [""],
	roleRequired: "", // id here
	cooldown: 0, // in ms
	options: [{ name: "user", description: "user to get avatar", required: false, type: ApplicationCommandOptionType.User }],
	function: async function ({ interaction }: { interaction: ChatInputCommandInteraction }) {
        let user;

        if(await interaction.options.get("user")) user= (await interaction.guild.members.fetch((await interaction.options.get("user")).toString())).user
        else user= await interaction.user
        let avatarEmbed = new  EmbedBuilder()
        .setAuthor({name : user.username ,iconURL : user.avatarURL()})
        .setTitle("Avatar!")
        .setURL(user.avatarURL())
        .setImage(user.avatarURL({size : 1024}))
        .setFooter({text : "requsted by " + interaction.user.username , iconURL : interaction.user.avatarURL()})

        let imageBtn = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel("avatar url")
        .setURL(user.avatarURL({ size: 1024 }));
    let row = new ActionRowBuilder<ButtonBuilder>().addComponents(imageBtn);
    interaction.reply({ embeds: [avatarEmbed], components: [row] });
	}
};
